import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { ICustomerRequest } from '../../models';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(
    private _route: Router,
    private _api: ApiService,
    private _alerts: AlertsService
  ) {}

  newForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{12}$/),
    ]),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}(-\d{4})?$/),
    ]),
  });

  createForm() {
    const formValue = this.newForm.value;

    const customer: ICustomerRequest = {
      firstName: formValue.firstName ?? '',
      middleName: formValue.middleName ?? '',
      lastName: formValue.lastName ?? '',
      email: formValue.email ?? '',
      phoneNumber: formValue.phoneNumber ?? '',
      dateOfBirth: formValue.dateOfBirth ?? '',
      gender: formValue.gender ?? '',
      address: formValue.address ?? '',
      zipCode: formValue.zipCode ?? '',
    };

    if (this.newForm.valid) {
      this._api.postCustomer(customer).subscribe((data) => {
        let response = data;
        if (response.status == 'Ok') {
          this._alerts.showSuccess('Customer created successfully', 'Done');
        } else {
          this._alerts.showError(data.result.message, 'Error');
        }
      });
    } else {
      this.newForm.markAllAsTouched();
    }
  }

  exit() {
    this._route.navigate(['dashboard']);
  }
}
