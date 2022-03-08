import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Client } from 'src/shared/models/client';
import { Car } from 'src/shared/models/car';

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
  
  delete(clientUuid: string): Observable<void> {
    return this.httpClient.delete(`${this.baseRoute}/${clientUuid}`)
      .pipe(
        map(() => { }),
        catchError(error => throwError(error))
      )
  }
  
  getByUuid(clientUuid: string): Observable<Client> {
    return this.httpClient.get(`${this.baseRoute}/${clientUuid}/details`)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
  
  addClientCar(clientUuid: string,parameters: any): Observable<Client> {
    return this.httpClient.post(`${this.baseRoute}/${clientUuid}/car`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
  
  editClientCar(clientUuid: string,parameters: any): Observable<Client> {
    return this.httpClient.put(`${this.baseRoute}/${clientUuid}/car`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
  
  deleteClientCar(clientUuid: string): Observable<Client> {
    return this.httpClient.delete(`${this.baseRoute}/${clientUuid}/car`)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
  
  editClientAddress(clientUuid: string,parameters: any): Observable<Client> {
    return this.httpClient.put(`${this.baseRoute}/${clientUuid}/address`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
  
  deleteClientAddress(clientUuid: string): Observable<Client> {
    return this.httpClient.delete(`${this.baseRoute}/${clientUuid}/address`)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
}
