import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { CreationMode, Group, GroupService, ModalDialogData } from 'src/app/core';
import { GroupEditorComponent } from './group-editor/group-editor.component';

@Component({
    selector: 'et-group-manager',
    templateUrl: './group-manager.component.html',
    styleUrls: ['./group-manager.component.scss'],
})
export class GroupManagerComponent implements OnInit {
    columns: string[];
    dataSource: MatTableDataSource<Group>;

    // Bind CreationMode for usage in template
    readonly CreationMode = CreationMode;

    constructor(private _groupService: GroupService, private _dialog: MatDialog) {
        this.columns = ['id', 'name', 'actions'];
        this.dataSource = new MatTableDataSource<Group>();
    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this._groupService
            .getAll()
            .pipe(tap((users) => (this.dataSource.data = users)))
            .subscribe();
    }

    showGroupDialog(mode: string, group?: Group): void {
        const dialogRef = this._dialog.open(GroupEditorComponent, { data: { creationMode: mode, model: group } as ModalDialogData<Group> });

        dialogRef
            .afterClosed()
            .pipe(tap(() => this.getData()))
            .subscribe();
    }
}
