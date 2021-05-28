import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '..';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private mockExpenses: Expense[] = [
      { userId: 1, cost: 5.75 },
      { userId: 1, cost: 35.00 },
      { userId: 1, cost: 12.79 },
      { userId: 2, cost: 12.00 },
      { userId: 2, cost: 15.00 },
      { userId: 2, cost: 23.23 },
      { userId: 3, cost: 10.00 },
      { userId: 3, cost: 20.00 },
      { userId: 3, cost: 38.41 },
      { userId: 3, cost: 45.00 },
  ];

  constructor(private _http: HttpClient) {}

  public getExpenses(): Observable<Expense[]> {
      return of(this.mockExpenses);
    //return this._http.get<Expense[]>();
  }
}
