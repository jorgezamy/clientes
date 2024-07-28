import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILogin, ILoginResponse } from '../../models/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'https://localhost:7012/';

  constructor(private http: HttpClient) {}

  loginByUsername(form: ILogin): Observable<any> {
    let baseUrl = this.url + 'Login';
    return this.http.post<any>(baseUrl, form);
  }
}
