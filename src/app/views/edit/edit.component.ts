import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ICustomer } from '../../models/index';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private _route: Router,
    private _activedRouter: ActivatedRoute,
    private _api: ApiService
  ) {}

  customer?: ICustomer;
  editForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let customerId = this._activedRouter.snapshot.paramMap.get('id') || '0';
    let token = this.getToken();
    this._api.getCustomerById(customerId).subscribe((data) => {
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
    const formValue = this.editForm.value;

    console.log('formValue', formValue);
  }
}
