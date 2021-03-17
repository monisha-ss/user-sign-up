import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

import { SignUpComponent } from './sign-up.component';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { SignUpService } from '../../services/sign-up.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: SignUpService;
  let toastService: ToastMessageService;
  let toasterServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [SignUpComponent],
      providers: [SignUpService, ToastMessageService],
    });
    signUpService = TestBed.inject(SignUpService);
    toastService = TestBed.inject(ToastMessageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for form invalid', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should validate on firstName', () => {
    let firstName = component.signUpForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    //firstName set to empty
    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTruthy();

    //firstName set to value Gerald
    firstName.setValue('Gerald');
    expect(firstName.hasError('required')).toBeFalsy();
  });

  it('should validate on lastName', () => {
    let lastName = component.signUpForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    //lastName set to empty
    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTruthy();

    //lastName set to Robin
    lastName.setValue('Robin');
    expect(lastName.hasError('required')).toBeFalsy();
  });

  it('should validate on email', () => {
    let email = component.signUpForm.controls['email'];
    expect(email.valid).toBeFalsy();
    //email set to empty
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    //email set to test
    email.setValue('test');
    expect(email.hasError('pattern')).toBeTruthy();

    //email validations for pattern
    email.setValue('test.');
    expect(email.hasError('pattern')).toBeTruthy();
    email.setValue('test@gmail.com');
    expect(email.hasError('pattern')).toBeFalsy();
  });

  it('should validate on password', () => {
    let password = component.signUpForm.controls['password'];
    let errors = {};
    expect(password.valid).toBeFalsy();

    //password set to empty
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    //password set to Ams
    password.setValue('Ams');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    //password validation on pattern
    password.setValue('amsterdam');
    expect(password.hasError('pattern')).toBeTruthy();
    password.setValue('AMSTERDAM');
    expect(password.hasError('pattern')).toBeTruthy();
    password.setValue('AmsterDam');
    expect(password.hasError('pattern')).toBeFalsy();
  });

  it('should validate on custom password with firstName', () => {
    let firstName = component.signUpForm.controls['firstName'];
    let lastName = component.signUpForm.controls['lastName'];
    let password = component.signUpForm.controls['password'];
    firstName.setValue('Gerald');
    lastName.setValue('Robin');
    password.setValue('aMsterdamGerald');
    expect(password.hasError('match')).toBeTruthy();
  });

  it('should validate on custom password with lastname', () => {
    let firstName = component.signUpForm.controls['firstName'];
    let lastName = component.signUpForm.controls['lastName'];
    let password = component.signUpForm.controls['password'];
    firstName.setValue('Gerald');
    lastName.setValue('Robin');
    password.setValue('aMsterRobindam');
    expect(password.hasError('match')).toBeTruthy();
  });

  it('should validate on proper custom password', () => {
    let firstName = component.signUpForm.controls['firstName'];
    let lastName = component.signUpForm.controls['lastName'];
    let password = component.signUpForm.controls['password'];
    firstName.setValue('Gerald');
    lastName.setValue('Robin');
    password.setValue('aMsterdam');
    expect(password.hasError('match')).toBeFalsy();
  });

  it('should call onSubmit method for empty form', () => {
    component.onSubmit();
    expect(component.signUpForm.valid).toBe(false);
  });

  it('should call onSubmit method', () => {
    const toasterSetvices = jasmine.createSpyObj('toastService', [
      'showSuccess',
    ]);
    toasterServiceSpy = toasterSetvices.showSuccess.and.returnValue(
      of('Signed Up successfully')
    );

    let mySpy = spyOn(signUpService, 'createSignUp').and.callThrough();
    let mySpytoast = spyOn(toastService, 'showSuccess').and.callFake(() => {});
    component.signUpForm.controls['firstName'].setValue('Arjun');
    component.signUpForm.controls['lastName'].setValue('Singh');
    component.signUpForm.controls['email'].setValue('arun@hgm.com');
    component.signUpForm.controls['password'].setValue('Amsterdma');
    component.onSubmit();

    expect(component.signUpForm.valid).toBe(true);
    expect(component.onSubmit).toHaveBeenCalled();
    expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpytoast.call).toBeTruthy();
    expect(toasterServiceSpy).toBeDefined();
  });
});
