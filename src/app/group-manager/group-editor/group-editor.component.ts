import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { CreationMode, ExpenseValidators, Group, GroupService, User, UserService } from 'src/app/core';
import { startCase } from 'lodash-es';

@Component({
    selector: 'et-group-editor',
    templateUrl: './group-editor.component.html',
    styleUrls: ['./group-editor.component.scss'],
})
export class GroupEditorComponent implements OnInit {
    isDeleting: boolean;
    isCreating: boolean;
    creationVerb: string;
    form: FormGroup;
    users!: User[];

    readonly idKey: string & keyof Group = 'id';
    readonly nameKey: string & keyof Group = 'name';
    readonly usersKey: string & keyof Group = 'users';

    constructor(
        @Inject(MAT_DIALOG_DATA) data: { creationMode: string; group: Group },
        private _dialogRef: MatDialogRef<GroupEditorComponent>,
        private _groupService: GroupService,
        private _userService: UserService,
        private _fb: FormBuilder,
        private _cdr: ChangeDetectorRef
    ) {
        this.isDeleting = data.creationMode === CreationMode.Delete;
        this.isCreating = data.creationMode === CreationMode.Create;
        this.creationVerb = startCase(data.creationMode.toString());
        this.form = _fb.group({
            [this.idKey]: [data.group ? data.group.id : undefined],
            [this.nameKey]: [data.group ? data.group.name : '', [Validators.required]],
            [this.usersKey]: _fb.array(data.group?.users ? data.group.users.map((u) => _fb.control(u.id)) : [], [ExpenseValidators.groupHasUsers]),
        });
    }

    get usersControls(): FormControl[] {
        return (this.form.get(this.usersKey)! as FormArray).controls as FormControl[];
    }

    ngOnInit(): void {
        this._userService
            .getAll()
            .pipe(tap((users) => (this.users = users)))
            .subscribe();
    }

    handleClick(): void {
        this.isDeleting ? this.deleteGroup() : this.isCreating ? this.createGroup() : this.editGroup();
    }

    removeUser(index: number): void {
        (this.form.get(this.usersKey)! as FormArray).removeAt(index);
        this._cdr.detectChanges(); // Removing a user programmatically can change the state of the form so run the change detector.
    }

    addUser(): void {
        (this.form.get(this.usersKey)! as FormArray).push(this._fb.control(''));
        this._cdr.detectChanges(); // Adding a user programmatically can change the state of the form so run the change detector.
    }

    isAnotherValue(user: User, index: number): boolean {
        return !!this.usersControls.find((u, i) => u.value === user.id && i !== index);
    }

    createGroup(): void {
        this._groupService
            .create(this._createGroup())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    editGroup(): void {
        this._groupService
            .update(this._createGroup())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    deleteGroup(): void {
        this._groupService
            .delete(this._createGroup())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    private _createGroup(): Group {
        return {
            id: this.form.get(this.idKey)!.value,
            name: this.form.get(this.nameKey)!.value,
            users: this.form.get(this.usersKey)!.value.map((id: number) => this.users.find((u) => u.id === id)),
        };
    }
}
