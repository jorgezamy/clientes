import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(private _route: Router, private _activedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    let customerId = this._activedRouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    console.log('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
