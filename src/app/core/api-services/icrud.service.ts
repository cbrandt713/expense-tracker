import { Observable } from 'rxjs';

export interface ICrudService<T> {
    getAll(id?: number): Observable<T[]>;
    create(item: T): Observable<T>;
    update(item: T): Observable<T>;
    delete(item: T): Observable<void>;
}
