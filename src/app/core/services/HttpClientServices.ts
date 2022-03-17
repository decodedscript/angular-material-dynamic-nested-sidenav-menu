import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpclientService {

    constructor(private _httpClient: HttpClient) { }

    // HttpClient API get() method => Fetch details
    get<T>(url: string) {
        return this._httpClient.get<T>(`${environment.API_URL}/${url}`).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    // HttpClient API get() method => Fetch details
    getList<T>(url: string) {
        return this._httpClient.get<T[]>(`${environment.API_URL}/${url}`).pipe(
            retry(1),
            catchError(this.handleError)
        )
    }
    // HttpClient API post() method => Create new record
    post(paylods: any) {
        return this._httpClient.post(environment.API_URL, paylods).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }
    // HttpClient API get() method => Fetch details
    getTableData(api: any[]) {
        return forkJoin(api)
    }
    // Error handling 
    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

}
