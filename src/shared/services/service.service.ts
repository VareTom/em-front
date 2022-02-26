import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Service } from 'src/shared/models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.service;
  }
  
  create (parameters: any): Observable<Service> {
    return this.httpClient.post(`${this.baseRoute}/`, parameters)
      .pipe(
        map((result: any) => {
          return new Service(result);
        }),
        catchError(error => throwError(error))
      );
  }
  
  getAllForEntity (): Observable<Service[]> {
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}`)
      .pipe(
        map((results: any) => {
          return results.map((service: any) => new Service(service));
        }),
        catchError(error => throwError(error))
      )
  }
  
  delete(serviceUuid: string): Observable<void> {
    return this.httpClient.delete(`${this.baseRoute}/${serviceUuid}`)
      .pipe(
        map(() => { }),
        catchError(error => throwError(error))
      )
  }
  
  update (serviceUuid: string, parameters: any): Observable<Service> {
    return this.httpClient.put(`${this.baseRoute}/${serviceUuid}`, parameters)
      .pipe(
        map((result: any) => {
          return new Service(result);
        }),
        catchError(error => throwError(error))
      );
  }
}
