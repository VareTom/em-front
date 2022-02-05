import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'src/store';

// Models
import { User } from 'src/shared/models/user';
import { NbComponentSize } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connectedUser$: Observable<User>;
  menuSize: NbComponentSize = 'small';

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
  }
  
  onLogout(): void {
    localStorage.removeItem('token');
    this.store.set('connectedUser',undefined);
    this.router.navigateByUrl('login')
  }
}
