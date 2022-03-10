import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Client } from 'src/shared/models/client';
import { Address } from 'src/shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly baseRoute: string;

  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.address;
  }

  create(clientUuid: string, parameters: any): Observable<Client> {
    return this.httpClient.post(`${this.baseRoute}/${clientUuid}`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }

  update(addressUuid: string, parameters: any): Observable<Client> {
    return this.httpClient.put(`${this.baseRoute}/${addressUuid}`, parameters)
      .pipe(
        map((result: any) => {
          return new Client(result);
        }),
        catchError(error => throwError(error))
      )
  }

  delete(addressUuid: string): Observable<Address> {
    return this.httpClient.delete(`${this.baseRoute}/${addressUuid}`)
      .pipe(
        map((result: any) => {
          return new Address(result);
        }),
        catchError(error => throwError(error))
      )
  }
}
