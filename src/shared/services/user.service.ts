import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseRoute: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.user;
  }

  /**
   * Get User info by uuid
   * @param uuid string
   */
  get (uuid: string): Observable <void> {
    return this.httpClient.get(`${this.baseRoute}/${uuid}`)
      .pipe(
        map((result: any) => {
          const newUser = new User(result);
          this.store.set('connectedUser', newUser);

          if (this.store.value.connectedUser.entity) {
            this.store.set('currentEntity', this.store.value.connectedUser.entity);
          }
        }),
        catchError(error => throwError(error))
      )
  }

  /**
   * Get All users of the platform
   * Only super admin can call this method.
   */
  getAll (): Observable<User[]> {
    return this.httpClient.get(`${this.baseRoute}/all`)
      .pipe(
        map((result: any) => {
          return result.map((user: any) => new User(user));
        }),
        catchError(error => throwError(error))
      )
  }
}
