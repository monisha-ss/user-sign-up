import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { GenericValidator } from 'src/app/shared/utilities/generic-validator';
import { PasswordMatcher } from 'src/app/shared/utilities/password-validator';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formErrors = { firstName: null, lastName: null, email: null, password: null };
  loading = false;
  signUpForm: FormGroup;
  submitted = false;

  validationMessages = {
    firstName: {
      required: 'First Name is required.',
    },
    lastName: {
      required: 'Last Name is required.',
    },
    email: {
      required: 'Email is required.',
      pattern: 'Please provide valid Email ID.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password length must be greater than or equal to 8.',
      pattern: 'Password should contain both upper case and lower case.',
      match: 'Password should not contains first name and last name.',
    },
  };

  private validation: GenericValidator;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private toastMessageService: ToastMessageService
  ) {
    // Define an instance of the validator for use with this form,
    this.validation = new GenericValidator();
  }

  ngOnInit(): any {
    this.validateForm();
  }

  /* 
    add respective constraints to the form field to validate
    listen for valueChanges in the form
  */
  public validateForm() {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validation.regex.email),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.validation.regex.password),
          ],
        ],
      },
      {
        validator: PasswordMatcher.match('firstName', 'lastName', 'password'),
      }
    );

    this.signUpForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.logValidationErrors());
  }

  /* logValidationErrors method calls getValidationErrors
     passing signUpForm and validation messages as parameter
     return formErrors
  */
  public logValidationErrors() {
    this.formErrors = this.validation.getValidationErrors(
      this.signUpForm,
      this.validationMessages
    );
  }

  /* onSubmit method subscribes http createSignUp 
     based on the form valid status and
     calls toast service to display appropriate messages
  */
  public onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.loading = true;
      this.signUpService.createSignUp(this.signUpForm.value).subscribe(() => {
        this.loading = false;
        this.toastMessageService.showSuccess('Signed Up Successfully');
        () => {
          this.loading = false;
          this.toastMessageService.showError(
            'Something went wrong ! Please contact admin'
          );
        };
      });
    }
  }
}
