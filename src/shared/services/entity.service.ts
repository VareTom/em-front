import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Entity } from 'src/shared/models/entity';
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.entity;
  }
  
  create (parameters: any): Observable<Entity> {
    return this.httpClient.post(`${this.baseRoute}/`, parameters)
      .pipe(
        map((result: any) => {
          const entity = new Entity(result);
          
          this.store.set('currentEntity',entity);
          this.store.value.connectedUser.entity = entity;
          
          return entity;
        }),
        catchError(error => throwError(error))
      );
  }
  
  getMembers (): Observable<User[]> {
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}/members`)
      .pipe(
        map((result: any) => {
          if (result) {
            return result.map((member: any) => new User(member));
          }
        })
      )
  }
  
  invite (parameters: any): Observable<User> {
    return this.httpClient.post(`${this.baseRoute}/${this.store.value.currentEntity.uuid}/invite`, parameters)
      .pipe(
        map((result: any) => {
          return new User(result);
        })
      )
  }
  
  removeMember (userUuid: string): Observable<User> {
    return this.httpClient.delete(`${this.baseRoute}/${this.store.value.currentEntity.uuid}/user/${userUuid}`)
      .pipe(
        map((result: any) => {
          return new User(result);
        })
      )
  }
}
