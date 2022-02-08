import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { AuthService } from 'src/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('auth/login');
      return false;
    }
    return true;
  }
}
