import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    console.log(this.store.value.connectedUser);
    //if (this.store.value.connectedUser.entities)
    
  }
  
  isNewUser(): boolean {
    return true;
  }
}
