import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from 'src/store';

// Services
import { AuthService } from 'src/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private store: Store) { }
  
  canActivate(): boolean {
    if (this.store.value.connectedUser) {
      return this.store.value.connectedUser.isSuperAdmin;
    }
    return false;
  }
}
