import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/shared/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { matchingPassword } from 'src/shared/validators/matching-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email, Validators.required ]],
    code: [null, Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required ]]
  });
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }
  
  get isEmailInvalid(): boolean {
    const formControl = this.registerForm.get('email');
    return formControl.getError('email');
  }
  
  get isEmailRequired(): boolean {
    const formControl = this.registerForm.get('email');
    return formControl.touched && formControl.getError('required');
  }
  
  get isCodeRequired(): boolean {
    const formControl = this.registerForm.get('code');
    return formControl.touched && formControl.getError('required');
  }
  
  validateInvitationCode(code: string) {
    this.authService.isValidCode(+code)
      .subscribe({
        next: (isValid) => {
          if (isValid) {
            this.registerForm.patchValue({
              code: code
            })
          } else {
            this.toastrService.danger(this.translate.instant('errors.code-not-valid'), this.translate.instant('errors.title'));
          }
        },
        error: () => {
          this.toastrService.danger(this.translate.instant('errors.http-not-found'), this.translate.instant('errors.title'));
        }
      })
  }
  
  onPasswordChange(): void {
    this.registerForm.get('confirmPassword').setValidators([
      Validators.required,
      matchingPassword(this.registerForm.get('password').value)
    ]);
    
    this.registerForm.updateValueAndValidity();
  }
  
  get isPasswordRequired(): boolean {
    const formControl = this.registerForm.get('password');
    return formControl.touched && formControl.getError('required');
  }
  
  get isConfirmPasswordRequired(): boolean {
    const formControl = this.registerForm.get('confirmPassword');
    return formControl.touched && formControl.getError('required');
  }
  
  get arePasswordNotMatching(): boolean {
    const formControl = this.registerForm.get('confirmPassword');
    return formControl.getError('matching-password');
  }
  
  getPasswordInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  
  getConfirmPasswordInputType(): string {
    if (this.showConfirmPassword) return 'text';
    return 'password';
  }
  
  toggleConfirmShowPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  onRegister(): void {
    this.isSubmitted = true;
    this.authService.register(this.registerForm.value)
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
