import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Models
import { Expenditure } from 'src/shared/models/expenditure';

// Interfacex
import { FiltersInterface } from 'src/shared/interfaces/filters.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.expenditure;
  }
  
  create (parameters: any): Observable<Expenditure> {
    return this.httpClient.post(`${this.baseRoute}/`, parameters)
      .pipe(
        map((result: any) => {
          return new Expenditure(result);
        }),
        catchError(error => throwError(error))
      );
  }
  
  getAllForEntity (filters: FiltersInterface): Observable<Expenditure[]> {
    let queryParams: string = '?';
    if (filters.period) queryParams += `period=${filters.period}`;
    
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}${queryParams}`)
      .pipe(
        map((results: any) => {
          return results.map((expenditure: any) => new Expenditure(expenditure));
        }),
        catchError(error => throwError(error))
      )
  }
  
  delete (expenditureUuid: string): Observable<void> {
    return this.httpClient.delete(`${this.baseRoute}/${expenditureUuid}`)
      .pipe(
        map(() => { }),
        catchError(error => throwError(error))
      )
  }
  
  update (expenditureUuid: string, parameters: any): Observable<Expenditure> {
    return this.httpClient.put(`${this.baseRoute}/${expenditureUuid}`, parameters)
      .pipe(
        map((result: any) => {
          return new Expenditure(result);
        }),
        catchError(error => throwError(error))
      );
  }
}
