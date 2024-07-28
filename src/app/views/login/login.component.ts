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

import { ILogin } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private api: ApiService) {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    const formValue: ILogin = this.myForm.value;

    if (this.myForm.valid) {
      console.log(formValue);
    } else {
      this.myForm.markAllAsTouched();
    }

    this.api.loginByUsername(formValue).subscribe((data) => console.log(data));
  }
}
