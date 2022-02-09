import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchingPassword(password: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return password == control.value ? null: { 'matching-password': true};
  }
}