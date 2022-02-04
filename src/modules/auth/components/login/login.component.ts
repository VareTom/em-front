import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
  errorMessages: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private store: Store,
              private translate: TranslateService) {
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
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        this.isSubmitted = false;
        this.router.navigateByUrl('dashboard');
      }, (error) => {
        this.isSubmitted = false;
        if (error.status === 404) {
          this.errorMessages = this.translate.instant('errors.http-not-found');
        }
        else{
          this.errorMessages = error.error.message;
        }
      })
  }
}
