import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models";
import { ApiService } from "./api.service";
import { ICrudService } from "./icrud.service";

@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService implements ICrudService<User> {
    constructor(private _http: HttpClient) {
        super();
    }

    getAll(): Observable<User[]> {
        return this._http.get<User[]>(this.getUrl('/user'));
    }

    create(user: User): Observable<User> {
        return this._http.post<User>(this.getUrl('/user'), user);
    }

    update(user: User): Observable<User> {
        return this._http.put<User>(this.getUrl(`/user/${user.id}`), user);
    }

    delete(user: User): Observable<void> {
        return this._http.delete<void>(this.getUrl(`/user/${user.id}`));
    }
}