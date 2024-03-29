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
export class CarService {

  private readonly baseRoute: string;

  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.car;
  }

  create(clientUuid: string,parameters: any): Observable<Client> {
    return this.httpClient.post(`${this.baseRoute}/${clientUuid}`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }

  update(clientUuid: string, carUuid: string, parameters: any): Observable<Client> {
    return this.httpClient.put(`${this.baseRoute}/${carUuid}/client/${clientUuid}`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }

  delete(carUuid: string): Observable<Client> {
    return this.httpClient.delete(`${this.baseRoute}/${carUuid}`)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }
}
