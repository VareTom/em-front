import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from 'src/store';

// Models
import { Order } from 'src/shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private readonly baseRoute: string;

  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.order;
  }
  
  create (parameters: any): Observable<Order> {
    return this.httpClient.post(`${this.baseRoute}/`, parameters)
      .pipe(
        map((result: any) => {
          return new Order(result);
        }),
        catchError(error => throwError(error))
      )
  }
  
  getAllForEntity (): Observable<Order[]> {
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}`)
      .pipe(
        map((orders: any) => {
          return orders.map((order: any) => new Order(order));
        }),
        catchError(error => throwError(error))
      )
  }
}