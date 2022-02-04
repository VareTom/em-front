import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/shared/services/auth.service';

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
  errorMessages: string;
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store,
              private translate: TranslateService,
              private authService: AuthService) {
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
  
  onPasswordChange(): void {
    this.registerForm.controls['confirmPassword'].reset();
    this.isConfirmPasswordError = false;
  }
  
  onRegister(): void {
    this.isSubmitted = true;
    if (this.registerForm.value.confirmPassword !== this.registerForm.value.password) {
      this.isSubmitted = false;
      this.isConfirmPasswordError = true;
    } else {
      this.authService.register(this.registerForm.value)
        .subscribe(() => {
          this.isSubmitted = false;
          this.router.navigateByUrl('dashboard');
          console.log(this.store.value.connectedUser)
        }, (error) => {
          this.isSubmitted = false;
          if (error.status === 404) this.errorMessages = this.translate.instant('errors.http-not-found')
          if (error.status === 500) this.errorMessages = this.translate.instant('errors.http-server')
          else{
            this.errorMessages = error.error.message;
          }
        })
    }
  }
}
