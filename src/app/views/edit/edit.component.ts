import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  // FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ICustomer } from '../../models/index';
import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private _route: Router,
    private _activedRouter: ActivatedRoute,
    private _api: ApiService,
    private _alerts: AlertsService
  ) {}

  customerId: string = '0';
  customer?: ICustomer;
  editForm = new FormGroup({
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

  ngOnInit(): void {
    this.customerId = this._activedRouter.snapshot.paramMap.get('id') || '0';
    let token = this.getToken();
    this._api.getCustomerById(this.customerId).subscribe((data) => {
      console.log('customer', data);
      this.customer = data;
      this.editForm.patchValue({
        firstName: this.customer.firstName,
        middleName: this.customer.middleName,
        lastName: this.customer.lastName,
        email: this.customer.email,
        phoneNumber: this.customer.phoneNumber,
        dateOfBirth: this.customer.dateOfBirth,
        gender: this.customer.gender,
        address: this.customer.address,
        zipCode: this.customer.zipCode,
      });

      console.log('editForm', this.editForm.value);
    });
    console.log('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  updateForm() {
    const formValue: ICustomer = {
      id: this.customerId,
      firstName: this.editForm.value.firstName ?? '',
      middleName: this.editForm.value.middleName ?? '',
      lastName: this.editForm.value.lastName ?? '',
      email: this.editForm.value.email ?? '',
      phoneNumber: this.editForm.value.phoneNumber ?? '',
      dateOfBirth: this.editForm.value.dateOfBirth ?? '',
      gender: this.editForm.value.gender ?? '',
      address: this.editForm.value.address ?? '',
      zipCode: this.editForm.value.zipCode ?? '',
    };

    if (this.editForm.valid) {
      console.log('es valido');
      console.log('formValue', formValue);

      this._api
        .putCustomerById(this.customerId, formValue)
        .subscribe((data) => {
          console.log('response update: ', data);
          let response = data;
          if (response.status == 'Ok') {
            this._alerts.showSuccess('Customer updated successfully', 'Done');
          } else {
            this._alerts.showError(data.result.message, 'Error');
          }
        });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  deleteCustomer() {
    this._api.deleteCustomerById(this.customerId).subscribe((data) => {
      console.log(data);
      let response = data;
      if (response.status == 'Ok') {
        this._alerts.showSuccess('Customer deleted', 'Done');
        this._route.navigate(['dashboard']);
      } else {
        this._alerts.showError(data.result.message, 'Error');
      }
    });
  }
}
