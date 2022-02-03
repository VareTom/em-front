import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  isSubmitted: boolean = false;
  registerForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required ]]
  });
  isConfirmPasswordError: boolean = false
  showMessages: any;
  
  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }
  
  isRequiredInputInvalid(formControlName: string): boolean {
    const formControl = this.registerForm.controls[formControlName];
    return formControl.invalid && formControl.touched;
  }
  
  isEmailInvalid(): boolean {
    const formControl = this.registerForm.get('email');
    return formControl.getError('email');
  }
  
  isEmailRequired(): boolean {
    const formControl = this.registerForm.get('email');
    return formControl.touched && formControl.getError('required');
  }
  
  onRegister(): void {
    this.isSubmitted = true;
    if (this.registerForm.value.confirmPassword !== this.registerForm.value.password) {
      this.isSubmitted = false;
      this.isConfirmPasswordError = true;
    } else {
      //TODO:: call service
    }
  }
}
