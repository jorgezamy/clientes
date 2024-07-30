import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { ApiService } from '../../services/api/api.service';
import { ICustomerResponse } from '../../models/index';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getCustomers(1, 10).subscribe((data: ICustomerResponse) => {
      console.log(data.customers);
    });
  }
}
