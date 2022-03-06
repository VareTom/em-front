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
              private store: Store,
              private router: Router) { }
  
  canActivate(): boolean {
    console.log('try super admin guard');
    if (this.store.value.connectedUser && this.store.value.currentEntity) {
      console.log('connected');
      return this.store.value.currentEntity.authorUuid === this.store.value.connectedUser.uuid;
    }
    return false;
  }
}
