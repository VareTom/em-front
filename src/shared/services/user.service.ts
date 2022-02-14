import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from 'src/store';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly baseRoute: string;
  
  constructor(private httpClient: HttpClient,
              private router: Router,
              private store: Store) {
    this.baseRoute = environment.serverUrl + Config.prefix + Config.user;
  }
  
  get(uuid: string): Observable<void> {
    return this.httpClient.get(`${this.baseRoute}/${uuid}`)
      .pipe(
        map((result: any) => {
          const newUser = new User(result);
          this.store.set('connectedUser', newUser);
  
          if (this.store.value.connectedUser.entities.length > 0) {
            if (newUser.activeEntityUuid) {
              const activeEntity = this.store.value.connectedUser.entities.find(entity => entity.uuid === newUser.activeEntityUuid);
              if (activeEntity) {
                this.store.set('currentEntity', activeEntity);
              } else {
                this.store.set('currentEntity',this.store.value.connectedUser.entities[0]);
                // TODO:: update activeentityuuid to user
              }
            } else {
              this.store.set('currentEntity',this.store.value.connectedUser.entities[0]);
            }
          }
        })
      )
  }
}
