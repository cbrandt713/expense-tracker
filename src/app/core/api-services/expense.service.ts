import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '..';
import { ApiService } from './api.service';
import { ICrudService } from './icrud.service';

@Injectable({
    providedIn: 'root',
})
export class ExpenseService
    extends ApiService
    implements ICrudService<Expense>
{

    constructor(private _http: HttpClient) {
        super();
    }

    getAll(groupId: number): Observable<Expense[]> {
        return this._http.get<Expense[]>(this.getUrl(`/group/${groupId}/expense`));
    }

    create(expense: Expense): Observable<Expense> {
        return this._http.post<Expense>(this.getUrl(`/group/${expense.group!.id}/expense`), expense);
    }

    update(expense: Expense): Observable<Expense> {
        return this._http.put<Expense>(this.getUrl(`/group/${expense.group!.id}/expense/${expense.id}`), expense);
    }

    delete(expense: Expense): Observable<void> {
        return this._http.delete<void>(this.getUrl(`/group/${expense.group!.id}/expense/${expense.id}`));
    }
}
