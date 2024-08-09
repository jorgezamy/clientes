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
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = `${environment.baseURL}`;

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  private GetHeaders(): HttpHeaders {
    const token = this._authService.getToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

    return this._http.post<IResponse>(baseUrl, form, {
      headers: this.GetHeaders(),
    });
  }

  getCustomerById(id: string): Observable<ICustomer> {
    let baseUrl = this.url + `customers/${id}`;
    return this._http.get<ICustomer>(baseUrl, {
      headers: this.GetHeaders(),
    });
  }

  putCustomerById(id: string, form: ICustomer): Observable<IResponse> {
    let baseUrl = this.url + `customers/${id}`;
    return this._http.put<IResponse>(baseUrl, form, {
      headers: this.GetHeaders(),
    });
  }

  deleteCustomerById(id: string): Observable<IResponse> {
    let baseUrl = this.url + `customers/${id}`;

    return this._http.delete<IResponse>(baseUrl, {
      headers: this.GetHeaders(),
    });
  }
}
