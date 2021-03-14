import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(public toastr: ToastrService) {}

  // show Toaster for success messages
  public showSuccess(message: string) {
    this.toastr.success(message);
  }

  // show Toaster for Error messages
  public showError(message: string) {
    this.toastr.error(message);
  }

  // show Toaster for Info messages
  public showInfo(message: string) {
    this.toastr.info(message);
  }

  // show Toaster for Warning messages
  public showWarning(message: string) {
    this.toastr.warning(message);
  }
}
