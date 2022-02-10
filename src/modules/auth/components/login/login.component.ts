import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  showPassword: boolean = false;
  isSubmitted: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email, Validators.required ]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private store: Store,
              private toastrService: NbToastrService,
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
  
  getInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.isSubmitted = true;
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.isSubmitted = false;
          this.router.navigateByUrl('dashboard');
        },
        error: (error) => {
          this.isSubmitted = false;
          if (error.status === 404) {
            this.toastrService.danger(this.translate.instant('errors.http-not-found'), this.translate.instant('errors.title'));
          } else {
            this.toastrService.danger(this.translate.instant('errors.http-server'), this.translate.instant('errors.title'));
          }
        }
      })
  }
}
