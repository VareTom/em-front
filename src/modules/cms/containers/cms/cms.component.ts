import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}