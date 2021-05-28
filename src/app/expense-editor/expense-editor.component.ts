import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../core';
import { ExpenseService } from '../core';
import { tap } from 'rxjs/operators';

import { groupBy } from 'lodash-es';

@Component({
    selector: 'et-expense-editor',
    templateUrl: './expense-editor.component.html',
    styleUrls: ['./expense-editor.component.scss'],
})
export class ExpenseEditorComponent implements OnInit {
    columns: string[];
    dataSource: MatTableDataSource<Expense>;
    constructor(private _expenseService: ExpenseService) {
        this.columns = [ 'name', 'cost', 'purpose' ];
        this.dataSource = new MatTableDataSource<Expense>();
    }

    get total(): number {
        return this.dataSource.data.reduce((total, expense) => expense.cost + total, 0);
    }

    get uniqueUsers(): number {
        return Object.keys(groupBy(this.dataSource.data, 'userId')).length;
    }

    get totalOwed(): number {
        return this.total / this.uniqueUsers;
    }

    ngOnInit(): void {
        this._expenseService
            .getExpenses()
            .pipe(tap((expenses) => (this.dataSource.data = expenses))).subscribe(console.log);
    }

    userOwes(userId: number): number {
        return this.dataSource.data
            .filter(expense => expense.userId === userId)
            .reduce((total, expense) => total + expense.cost, 0);
    }
}
