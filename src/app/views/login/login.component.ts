import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { ILogin, IResponse } from '../../models/index';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private _api: ApiService, private _router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token') || '';

      if (this.isTokenExpired(token)) {
        localStorage.removeItem(token);
        this._router.navigate(['login']);
      } else {
        this._router.navigate(['dashboard']);
      }
    }
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Obtén el tiempo actual en segundos

      // Verifica si el token ha expirado
      return decodedToken.exp < currentTime;
    } catch (e) {
      // En caso de error en la decodificación del token
      return true;
    }
  }

  errorStatus: boolean = false;
  errorMsg: string = '';

  onLogin() {
    const formValue: ILogin = this.myForm.value;

    if (this.myForm.valid) {
      this._api
        .loginByUsername(formValue)
        .pipe(
          catchError((error) => {
            let errorDetails: any = {};

            try {
              //message es una propiedad que genero throwError en el observable
              errorDetails = JSON.parse(error.message);
            } catch (e) {
              errorDetails = { status: 'Unknown', result: 'An error occurred' };
            }

            this.errorStatus = true;
            this.errorMsg = errorDetails.result.message;
            return of(null);
          })
        )
        .subscribe((data) => {
          if (data) {
            let dataResponse: IResponse = data;
            if (dataResponse.status == 'Ok') {
              console.log('status ok');
              localStorage.setItem('token', dataResponse.result.token);
              this._router.navigate(['dashboard']);
            }
          }
        });
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
