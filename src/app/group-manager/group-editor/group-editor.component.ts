import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Group, GroupService, User, UserService } from 'src/app/core';

@Component({
  selector: 'et-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.scss']
})
export class GroupEditorComponent implements OnInit {

    isDeleting: boolean;
    isCreating: boolean;
    creationVerb: string;
    form: FormGroup;
    users!: User[];

    constructor(
        @Inject(MAT_DIALOG_DATA) data: { creationMode: string; group: Group },
        private _dialogRef: MatDialogRef<GroupEditorComponent>,
        private _groupService: GroupService,
        private _userService: UserService,
        private _fb: FormBuilder
    ) {
        this.isDeleting = data.creationMode === 'delete';
        this.isCreating = data.creationMode === 'create';
        this.creationVerb = this.isDeleting ? 'Delete' : this.isCreating ? 'Create' : 'Edit';
        this.form = _fb.group({
            id: [data.group ? data.group.id : undefined],
            name: [data.group ? data.group.name : '', [Validators.required]],
            users: _fb.array(data.group?.users ? data.group.users.map(u => _fb.control(u.id)) : [])
        });
    }

    get usersControls(): FormControl[] {
        return (this.form.get('users')! as FormArray).controls as FormControl[];
    }

    ngOnInit(): void {
        this._userService.getAll().pipe(tap(users => this.users = users)).subscribe();
    }

    handleClick(): void {
        this.isDeleting ? this.deleteGroup() : this.isCreating ? this.createGroup() : this.editGroup();
    }

    removeUser(index: number): void {
        (this.form.get('users')! as FormArray).removeAt(index);
    }

    addUser(): void {
        (this.form.get('users')! as FormArray).push(this._fb.control(''));
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
            id: this.form.get('id')!.value,
            name: this.form.get('name')!.value,
            users: this.form.get('users')!.value.map((id: number) => this.users.find(u => u.id === id))
        };
    }

}
