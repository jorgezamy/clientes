import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ApiService } from '../../services/api/api.service';
import { ICustomer, ICustomers, ICustomersResponse } from '../../models/index';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  customers: ICustomers[] = [];

  constructor(private _api: ApiService, private _router: Router) {}

  ngOnInit(): void {
    this._api.getCustomers(1, 10).subscribe((data: ICustomersResponse) => {
      console.log(data.customers);
      this.customers = data.customers;
    });
  }

  newCustomer() {
    this._router.navigate(['create']);
  }

  editCustomer(id: number) {
    this._router.navigate(['edit', id]);
  }
}
