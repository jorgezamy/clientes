import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ILogin, ILoginResponse, TResult } from '../../models/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'https://localhost:7012/';

  constructor(private http: HttpClient) {}

  loginByUsername(form: ILogin): Observable<ILoginResponse> {
    let baseUrl = this.url + 'Login';
    return this.http
      .post<ILoginResponse>(baseUrl, form)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Extract error details
    const errorStatus = error.error?.status || 'Unknown Status';
    const errorResult = error.error?.result || 'Unknown Error';

    // Create a structured error object
    const structuredError = {
      status: errorStatus,
      result: errorResult,
    };

    return throwError(() => new Error(JSON.stringify(structuredError)));
  }
}
