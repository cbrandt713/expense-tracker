import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupManagerComponent } from './group-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [{ path: '', component: GroupManagerComponent }];

@NgModule({
    declarations: [GroupManagerComponent, GroupEditorComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ],
})
export class GroupManagerModule {}
