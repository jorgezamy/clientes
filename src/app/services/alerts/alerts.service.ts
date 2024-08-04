import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private _toast: ToastrService) {}

  showSuccess(text: string, title: string) {
    this._toast.success(text, title);
  }

  showError(text: string, title: string) {
    this._toast.error(text, title);
  }
}
