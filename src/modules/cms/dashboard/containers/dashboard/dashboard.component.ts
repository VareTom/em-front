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
  }
  
  isNewUser(): boolean {
    return true;
  }
}
