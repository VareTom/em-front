import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';

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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private store: Store) {
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
        this.router.navigateByUrl('/home');
        console.log(this.store.value.connectedUser)
      }, (error => {
        this.isSubmitted = false;
        console.log(error);
        this.showMessages = error;
      }))
  }
}
