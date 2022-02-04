import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from 'src/store';

// Models
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connectedUser$: Observable<User>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
  }

}
