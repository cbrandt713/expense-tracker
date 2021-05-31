import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { User, UserService } from 'src/app/core';
import { UserEditorComponent } from './user-editor/user-editor.component';

@Component({
    selector: 'et-user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
    columns: string[];
    dataSource: MatTableDataSource<User>;

    constructor(private _userService: UserService, private _dialog: MatDialog) {
        this.columns = ['id', 'name', 'actions'];
        this.dataSource = new MatTableDataSource<User>();
    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this._userService
            .getAll()
            .pipe(tap((users) => (this.dataSource.data = users)))
            .subscribe();
    }

    showUserDialog(mode: string, user?: User): void {
        const dialogRef = this._dialog.open(UserEditorComponent, { data: { creationMode: mode, user } });

        dialogRef
            .afterClosed()
            .pipe(tap(() => this.getData()))
            .subscribe();
    }
}
