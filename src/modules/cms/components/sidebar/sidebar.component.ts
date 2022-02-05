import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: NbMenuItem[] = [
    {
      title: this.translate.instant('sidebar.dashboard'),
      icon: 'home-outline',
      link: 'dashboard'
    },
    {
      title: this.translate.instant('sidebar.entities'),
      icon: 'grid-outline',
      link: 'entities'
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
  ];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
