import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Store } from 'src/store';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems$: Observable<NbMenuItem[]>;

  menuItems: NbMenuItem[] = [
    {
      title: this.translate.instant('sidebar.dashboard'),
      icon: 'home',
      link: 'dashboard'
    },
    {
      title: this.translate.instant('sidebar.contact'),
      icon: 'message-square-outline',
      link: 'contact'
    }
  ];

  constructor(private translate: TranslateService, private store: Store) { }

  ngOnInit(): void {
    this.menuItems$ = this.store.select<NbMenuItem[]>('menuItems');
    if (this.store.value.connectedUser.entity) {
      this.menuItems.splice(1, 0,
        {
          title: this.translate.instant('sidebar.expenditures'),
          icon: 'credit-card-outline',
          link: 'expenditures'
        },
        {
          title: this.translate.instant('sidebar.services'),
          icon: 'shopping-bag-outline',
          link: 'services'
        },
        {
          title: this.translate.instant('sidebar.clients'),
          icon: 'people-outline',
          link: 'clients'
        },
        {
          title: this.translate.instant('sidebar.orders'),
          icon: 'shopping-cart-outline',
          link: 'orders'
        }
      )
    }

    this.store.set('menuItems', this.menuItems);
  }
}
