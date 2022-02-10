import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Entity } from 'src/shared/models/entity';

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
          if (!this.store.value.connectedUser.entities) {
            this.store.set('currentEntity',new Entity(result));
            this.store.value.connectedUser.entities = [new Entity(result)];
          } else {
            this.store.value.connectedUser.entities.push(new Entity(result));
          }
  
          return new Entity(result);
        }),
        catchError(error => throwError(error))
      );
  }
  
  getAllForEntity(): Observable<Entity[]> {
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}`)
      .pipe(
        map((result: any) => {
          if (result) {
            return result.map((entity: any) => new Entity(entity));
          }
        })
      )
  }
}
