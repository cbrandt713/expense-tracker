import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { CreationMode, ModalDialogData, User, UserService } from 'src/app/core';
import { startCase } from 'lodash-es';

@Component({
    selector: 'et-user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent {
    isDeleting: boolean;
    isCreating: boolean;
    creationVerb: string;
    form: FormGroup;

    readonly idKey: string & keyof User = 'id';
    readonly nameKey: string & keyof User = 'name';

    constructor(
        fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) data: ModalDialogData<User>,
        private _dialogRef: MatDialogRef<UserEditorComponent>,
        private _userService: UserService,
    ) {
        this.isDeleting = data.creationMode === CreationMode.Delete;
        this.isCreating = data.creationMode === CreationMode.Create;
        this.creationVerb = startCase(data.creationMode.toString());
        this.form = fb.group({
            [this.idKey]: [data.model ? data.model.id : undefined],
            [this.nameKey]: [data.model ? data.model.name : '', [Validators.required]],
        });
    }

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
            id: this.form.get(this.idKey)!.value,
            name: this.form.get(this.nameKey)!.value,
        };
    }
}
