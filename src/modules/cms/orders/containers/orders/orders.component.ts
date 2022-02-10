import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Store } from 'src/store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  defaultColumns = [ 'name', 'description' ];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    // this.initData();
    // TODO:: get all entities + members for user uuid connected
  }
  
  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
  
  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

}
