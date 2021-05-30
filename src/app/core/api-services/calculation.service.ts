import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CalculationService extends ApiService {
    constructor(private _http: HttpClient) {
        super();
    }

    getTotalOwed(groupId: number): Observable<any[]> {
        return this._http.get<any[]>(this.getUrl(`/group/${groupId}/calculation`));
    }
}
