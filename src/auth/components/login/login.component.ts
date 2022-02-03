import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  isSubmitted: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', Validators.required]
  });
  showMessages: any;
  
  constructor(private fb: FormBuilder, private router: Router) {
  }
  
  ngOnInit() {
  }
  
  isRequiredInputInvalid(formControlName: string): boolean {
    const formControl = this.loginForm.controls[formControlName];
    return formControl.invalid && formControl.touched;
  }
  
  isEmailInvalid(): boolean {
    const formControl = this.loginForm.get('email');
    return formControl.getError('email');
  }
  
  isEmailRequired(): boolean {
    const formControl = this.loginForm.get('email');
    return formControl.touched && formControl.getError('required');
  }
  
  onLogin(): void {
    this.isSubmitted = true;
  }
}
