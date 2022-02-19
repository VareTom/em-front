import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Statistic } from 'src/shared/models/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.statistic;
  }
  
  getAllForEntity (): Observable<Statistic> {
    return this.httpClient.get(`${this.baseRoute}/${this.store.value.currentEntity.uuid}`)
      .pipe(
        map((results: any) => {
          return new Statistic(results);
        })
      )
  }
}
