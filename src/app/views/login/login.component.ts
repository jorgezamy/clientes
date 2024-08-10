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
