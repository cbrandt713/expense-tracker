import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Debt } from '../models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class DebtService extends ApiService {
    constructor(private _http: HttpClient) {
        super();
    }

    getTotalOwed(groupId: number): Observable<any[]> {
        return this._http.get<Debt[]>(this.getUrl(`/group/${groupId}/debt`));
    }
}
