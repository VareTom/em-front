import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import Config from 'src/app/config/serverUrls.json';
import { Router } from '@angular/router';
import { Store } from 'src/store';

// Models
import { User } from 'src/shared/models/user';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseRoute: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.auth;
  }

  onLogout(): void {
    this.store.set('currentEntity', undefined);
    this.store.set('connectedUser', undefined);
    localStorage.removeItem('token');
    this.router.navigateByUrl('login')
  }

  login (parameters: any): Observable<void> {
    return this.httpClient.post(`${this.baseRoute}/login`, parameters)
      .pipe(
        map((result: any) => {
          localStorage.setItem('token', result.token);
          const newUser = new User(result.user);
          this.store.set('connectedUser', newUser);
  
          if (this.store.value.connectedUser.entity) {
            this.store.set('currentEntity', this.store.value.connectedUser.entity);
          }
        }),
        catchError(error => throwError(error))
      );
  }

  register (parameters: any): Observable<void> {
    return this.httpClient.post(`${this.baseRoute}/register`, parameters)
      .pipe(
        map((result: any) => {
          localStorage.setItem('token', result.token);
          const newUser = new User(result.user);
          this.store.set('connectedUser', newUser);
        }),
        catchError(error => throwError(error))
      )
  }
  
  isValidCode (code: number): Observable<boolean> {
    return this.httpClient.post(`${this.baseRoute}/valid/code`, {code: code})
      .pipe(
        map((result) => {
          return !!result;
        })
      )
  }
}
