import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Expense, GroupService, ExpenseService, Group, Debt, CalculationService } from 'src/app/core';
import { tap } from 'rxjs/operators';
import { ExpenseEditorComponent } from './expense-editor/expense-editor.component';

@Component({
    selector: 'et-expense-manager',
    templateUrl: './expense-manager.component.html',
    styleUrls: ['./expense-manager.component.scss'],
})
export class ExpenseManagerComponent implements OnInit {
    columns: string[];
    dataSource: MatTableDataSource<Expense>;
    groups: Group[];
    selectedGroup: Group | undefined;

    debts?: Debt[]; 

    constructor(private _dialog: MatDialog, private _calculationService: CalculationService, private _groupService: GroupService, private _expenseService: ExpenseService) {
        this.columns = [ 'id', 'name', 'cost', 'purpose', 'actions' ];
        this.dataSource = new MatTableDataSource<Expense>();
        this.groups = [];
    }

    ngOnInit(): void {
        this._groupService.getAll().pipe(tap(groups => this.groups = groups)).subscribe();
    }

    getData(): void {
        this._expenseService
            .getAll(this.selectedGroup!.id as number)
            .pipe(tap((expenses) => (this.dataSource.data = expenses))).subscribe(console.log);
    }

    onSelectGroup(change: MatSelectChange): void {
        this.selectedGroup = this.groups.find(g => g.id === change.value);
        this.getData();
    }
    
    showExpenseDialog(mode: string, expense?: Expense): void {
        const dialogRef = this._dialog.open(ExpenseEditorComponent, { data: { creationMode: mode, group: this.selectedGroup, expense } });

        dialogRef.afterClosed().pipe(tap(() => this.getData())).subscribe();
    }

    calculateTotals(): void {
        this._calculationService.getTotalOwed(this.selectedGroup!.id!).pipe(tap(results => this.debts = results)).subscribe(console.log);
    }
}
