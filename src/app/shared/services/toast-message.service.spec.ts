import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ToastMessageService } from './toast-message.service';

describe('ToastMessageService', () => {
  let toastService: ToastMessageService;
  let toaster: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ToastrModule.forRoot()],
      providers: [ToastMessageService, ToastrService],
    });
    toastService = TestBed.inject(ToastMessageService);
    toaster = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(toastService).toBeTruthy();
  });

  it('should invoke showSuccess method', () => {
    const message = 'testSuccess';
    let spytoast = spyOn(toaster, 'success').and.callThrough();
    toastService.showSuccess(message);
    expect(spytoast).toHaveBeenCalled();
  });

  it('should invoke showError method', () => {
    const message = 'testError';
    let spytoast = spyOn(toaster, 'error').and.callThrough();
    toastService.showError(message);
    expect(spytoast).toHaveBeenCalled();
  });

  it('should invoke showInfo method', () => {
    const message = 'testInfo';
    let spytoast = spyOn(toaster, 'info').and.callThrough();
    toastService.showInfo(message);
    expect(spytoast).toHaveBeenCalled();
  });

  it('should invoke showWarning method', () => {
    const message = 'testWarning';
    let spytoast = spyOn(toaster, 'warning').and.callThrough();
    toastService.showWarning(message);
    expect(spytoast).toHaveBeenCalled();
  });
});
