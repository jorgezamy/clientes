import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup<ILoginForm>({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onLogin() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      console.log(formValue);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
interface ILoginForm {
  usuario: FormControl<string | null>;
  password: FormControl<string | null>;
}
