import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private store: Store,
              private router: Router) { }
  
  canActivate(): boolean {
    if (this.store.value.connectedUser) {
      return true;
    }
    this.router.navigateByUrl('auth/login');
    return false;
  }
}
