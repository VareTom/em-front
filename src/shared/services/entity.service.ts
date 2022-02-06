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
  
  create (parameters: any): Observable<void> {
    return this.httpClient.post(`${this.baseRoute}/`, parameters)
      .pipe(
        map((result: any) => {
          this.store.value.connectedUser.entities.push(new Entity(result));
          console.log(result);
        }),
        catchError(error => throwError(error))
      );
  }
}
