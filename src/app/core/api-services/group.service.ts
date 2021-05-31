import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models';
import { ApiService } from './api.service';
import { ICrudService } from './icrud.service';

@Injectable({
    providedIn: 'root',
})
export class GroupService extends ApiService implements ICrudService<Group> {
    constructor(private _http: HttpClient) {
        super();
    }

    getAll(): Observable<Group[]> {
        return this._http.get<Group[]>(this.getUrl('/group'));
    }

    create(group: Group): Observable<Group> {
        return this._http.post<Group>(this.getUrl('/group'), group);
    }

    update(group: Group): Observable<Group> {
        return this._http.put<Group>(this.getUrl(`/group/${group.id}`), group);
    }

    delete(group: Group): Observable<void> {
        return this._http.delete<void>(this.getUrl(`/group/${group.id}`));
    }
}
