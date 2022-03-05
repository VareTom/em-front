import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from 'src/shared/models/client';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.contact;
  }
  
  contact (parameters: any): Observable<boolean> {
    return this.httpClient.post(`${this.baseRoute}/contact`, parameters)
      .pipe(
        map((result: any) => {
          return !!result;
        }),
        catchError(error => throwError(error))
      );
  }
}
