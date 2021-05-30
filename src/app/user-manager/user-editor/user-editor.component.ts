import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { User, UserService } from 'src/app/core';

@Component({
    selector: 'et-user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {
    isDeleting: boolean;
    isCreating: boolean;
    creationVerb: string;
    form: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) data: { creationMode: string; user: User },
        private _dialogRef: MatDialogRef<UserEditorComponent>,
        private _userService: UserService,
        fb: FormBuilder
    ) {
        this.isDeleting = data.creationMode === 'delete';
        this.isCreating = data.creationMode === 'create';
        this.creationVerb = this.isDeleting ? 'Delete' : this.isCreating ? 'Create' : 'Edit';
        this.form = fb.group({
            id: [data.user ? data.user.id : undefined],
            name: [data.user ? data.user.name : '', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    handleClick(): void {
        this.isDeleting ? this.deleteUser() : this.isCreating ? this.createUser() : this.editUser();
    }

    createUser(): void {
        this._userService
            .create(this._createUser())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    editUser(): void {
        this._userService
            .update(this._createUser())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    deleteUser(): void {
        this._userService
            .delete(this._createUser())
            .pipe(tap(() => this._dialogRef.close()))
            .subscribe();
    }

    private _createUser(): User {
        return {
            id: this.form.get('id')!.value,
            name: this.form.get('name')!.value,
        };
    }
}
