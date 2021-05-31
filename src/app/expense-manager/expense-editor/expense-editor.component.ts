import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { CreationMode, Expense, ExpenseDialogData, ExpenseService, ExpenseValidators, Group, User } from 'src/app/core';
import { startCase } from 'lodash-es';

@Component({
    selector: 'et-expense-editor',
    templateUrl: './expense-editor.component.html',
    styleUrls: ['./expense-editor.component.scss'],
})
export class ExpenseEditorComponent {
    isDeleting: boolean;
    isCreating: boolean;
    creationVerb: string;
    form: FormGroup;
    users: User[];
    group: Group;

    readonly idKey: string & keyof Expense = 'id';
    readonly costKey: string & keyof Expense = 'cost';
    readonly purposeKey: string & keyof Expense = 'purpose';
    readonly userKey: string & keyof Expense = 'user';

    constructor(
        fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) data: ExpenseDialogData,
        private _dialogRef: MatDialogRef<ExpenseEditorComponent>,
        private _expenseService: ExpenseService,
    ) {
        this.isDeleting = data.creationMode === CreationMode.Delete;
        this.isCreating = data.creationMode === CreationMode.Create;
        this.creationVerb = startCase(data.creationMode.toString());
        this.group = data.group;
        this.users = data.group.users!;
        this.form = fb.group({
            [this.idKey]: [data.model ? data.model.id : undefined],
            [this.costKey]: [data.model ? data.model.cost : '', [Validators.required, ExpenseValidators.currencyValue]],
            [this.purposeKey]: [data.model ? data.model.purpose : ''],
            [this.userKey]: [data.model ? data.model.user!.id : undefined, [Validators.required]],
        });
    }

    handleClick(): void {
        this.isDeleting ? this.deleteExpense() : this.isCreating ? this.createExpense() : this.editExpense();
    }

    createExpense(): void {
        this._expenseService
            .create(this._createExpense())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    editExpense(): void {
        this._expenseService
            .update(this._createExpense())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    deleteExpense(): void {
        this._expenseService
            .delete(this._createExpense())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    private _createExpense(): Expense {
        return {
            id: this.form.get(this.idKey)!.value,
            cost: this.form.get(this.costKey)!.value,
            purpose: this.form.get(this.purposeKey)!.value,
            user: this.users.find((u) => u.id === this.form.get(this.userKey)!.value),
            group: this.group,
        };
    }
}
