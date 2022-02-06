import { Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Store } from 'src/store';
import { NbComponentSize, NbMenuService } from '@nebular/theme';
import { Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';

// Models
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connectedUser$: Observable<User>;
  menuSize: NbComponentSize = 'small';
  menuEntities: any[] = [];

  constructor(private store: Store, private router: Router, private nbMenuService: NbMenuService) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.menuEntities = [
      {
        title: 'entity2',
        queryParams: { uuid: "1" }
      }
    ]
    
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'entity-context-menu'),
        map(({ item: {queryParams}}) => queryParams),
      )
      .subscribe(queryParams => this.onEntitySwitch(queryParams));
  }
  
  onLogout(): void {
    localStorage.removeItem('token');
    this.store.set('connectedUser',undefined);
    this.router.navigateByUrl('login')
  }
  
  onSettings(): void {
    this.router.navigateByUrl('entities');
  }
  
  onCreateFirstEntity(): void {
    console.log('create first entity')
  }
  
  private onEntitySwitch(selectedEntity: Params): void {
    console.log(selectedEntity)
    // TODO:: find from user entities where name ===
  }
}
