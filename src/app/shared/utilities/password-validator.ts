import { AbstractControl, FormGroup } from '@angular/forms';

export class PasswordMatcher {
  public static match(
    firstName: string,
    lastName: string,
    password: string
  ): any {
    return (formGroup: FormGroup) => {
      const controlFirstName = formGroup.controls[firstName];
      const controlLastName = formGroup.controls[lastName];
      const controlPassword = formGroup.controls[password];
      const firstNameLower = controlFirstName.value.toLowerCase();
      const lastNameLower = controlLastName.value.toLowerCase();
      const passwordNameLower = controlPassword.value.toLowerCase();

      if (!controlFirstName || !controlLastName || !controlPassword) {
        return null;
      }

      if (controlPassword.errors && !controlPassword.errors.match) {
        return null;
      }

      if (
        passwordNameLower.includes(firstNameLower) ||
        passwordNameLower.includes(lastNameLower)
      ) {
        controlPassword.setErrors({ match: true });
      } else {
        controlPassword.setErrors(null);
      }
    };
  }
}
