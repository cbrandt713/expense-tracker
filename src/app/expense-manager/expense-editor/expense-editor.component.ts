import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Expense, ExpenseService, ExpenseValidators, Group, User } from 'src/app/core';

@Component({
  selector: 'et-expense-editor',
  templateUrl: './expense-editor.component.html',
  styleUrls: ['./expense-editor.component.scss']
})
export class ExpenseEditorComponent {

    isDeleting: boolean;
    isCreating: boolean;
    creationVerb: string;
    form: FormGroup;
    users: User[];
    group: Group;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: { creationMode: string; group: Group, expense: Expense },
        private _dialogRef: MatDialogRef<ExpenseEditorComponent>,
        private _expenseService: ExpenseService,
        fb: FormBuilder
    ) {
        this.isDeleting = data.creationMode === 'delete';
        this.isCreating = data.creationMode === 'create';
        this.creationVerb = this.isDeleting ? 'Delete' : this.isCreating ? 'Create' : 'Edit';
        this.group = data.group;
        this.users = data.group.users!;
        this.form = fb.group({
            id: [data.expense ? data.expense.id : undefined],
            cost: [data.expense ? data.expense.cost : '', [Validators.required, ExpenseValidators.currencyValue]],
            purpose: [data.expense ? data.expense.purpose : ''],
            user: [data.expense ? data.expense.user!.id : undefined],
            group: [data.expense ? data.expense.group!.id : undefined]
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
            id: this.form.get('id')!.value,
            cost: this.form.get('cost')!.value,
            purpose: this.form.get('purpose')!.value,
            user: this.users.find(u => u.id === this.form.get('user')!.value),
            group: this.group
        };
    }

}
