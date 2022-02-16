import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Client } from 'src/shared/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.client;
  }
  
  create (parameters: any): Observable<Client> {
    return this.httpClient.post(`${this.baseRoute}/`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      );
  }
  
  getAllForEntity (): Observable<Client[]> {
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}`)
      .pipe(
        map((results: any) => {
          return results.map((client: any) => new Client(client));
        }),
        catchError(error => throwError(error))
      )
  }
}
