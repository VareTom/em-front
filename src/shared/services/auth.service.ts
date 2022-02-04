import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import Config from 'src/app/config/serverUrls.json';
import { Store } from 'src/store';
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseRoute: string;

  constructor(private httpClient: HttpClient, private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.auth;
  }

  login (parameters: any): Observable<void> {
    console.log(this.baseRoute);
    return this.httpClient.post(`${this.baseRoute}/login`, parameters)
      .pipe(
        map((result: any) => {
          localStorage.setItem('token', result.token);
          const newUser = new User(result.user);
          this.store.set('connectedUser', newUser);
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
}
