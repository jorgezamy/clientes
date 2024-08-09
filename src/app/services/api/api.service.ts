import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  ILogin,
  IResponse,
  ICustomersResponse,
  ICustomer,
  ICustomerRequest,
} from '../../models/index';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = `${environment.baseURL}`;

  constructor(private _http: HttpClient) {}

  private GetHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.apiToken}`,
    });
  }

  loginByUsername(form: ILogin): Observable<IResponse> {
    let baseUrl = this.url + 'login';
    return this._http
      .post<IResponse>(baseUrl, form)
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

  getCustomers(
    pageNumber: number,
    pageSize: number
  ): Observable<ICustomersResponse> {
    let baseUrl =
      this.url + `customers?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this._http.get<ICustomersResponse>(baseUrl, {
      headers: this.GetHeaders(),
    });
  }

  postCustomer(form: ICustomerRequest): Observable<IResponse> {
    let baseUrl = this.url + `customers`;
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this._http.post<IResponse>(baseUrl, form, options);
  }

  getCustomerById(id: string): Observable<ICustomer> {
    let baseUrl = this.url + `customers/${id}`;
    return this._http.get<ICustomer>(baseUrl);
  }

  putCustomerById(id: string, form: ICustomer): Observable<IResponse> {
    let baseUrl = this.url + `customers/${id}`;
    return this._http.put<IResponse>(baseUrl, form);
  }

  deleteCustomerById(id: string): Observable<IResponse> {
    let baseUrl = this.url + `customers/${id}`;
    let options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this._http.delete<IResponse>(baseUrl, options);
  }
}
