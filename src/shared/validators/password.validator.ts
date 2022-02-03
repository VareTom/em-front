import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static matchingPassword(password: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return password === control.value ? null: {'matching-password': true}
    }
  }
}