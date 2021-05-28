import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseEditorComponent } from './expense-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: ExpenseEditorComponent }];

@NgModule({
  declarations: [ExpenseEditorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatTableModule],
})
export class ExpenseEditorModule {}
