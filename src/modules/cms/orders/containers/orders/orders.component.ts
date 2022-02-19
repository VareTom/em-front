import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest, NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Store } from 'src/store';

// Services
import { OrderService } from 'src/shared/services/order.service';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Order } from 'src/shared/models/order';
import moment from 'moment';
import {
  CreateOrderDialogComponent
} from 'src/modules/cms/orders/components/create-order-dialog/create-order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  defaultColumns = [ 'client', 'total', 'duration', 'serviceNumber', 'performedAt', 'isValidated' ];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private readonly orderService: OrderService,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    this.orderService.getAllForEntity()
      .subscribe({
        next: (orders) => {
          if (orders.length > 0) this.refreshDataSource(orders);
        },
        error: (error) => this.toastrService.danger(this.translate.instant('order.retrieve-failed'), this.translate.instant('errors.title'))
      })
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
  
  private refreshDataSource(orders: Order[]): void {
    orders.forEach(order => {
      this.data.push({
        data: {
          client: order.client.fullName,
          total: (order.totalInCent/100).toFixed(2) + '€',
          duration: order.durationInMinute + 'mins',
          serviceNumber: order.services.length,
          performedAt: order.performedAt? moment(order.performedAt).format('DD/MM/YYYY'): '-',
          isValidated: order.validatedAt ? this.translate.instant('global.yes'): this.translate.instant('global.no')
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onCreate(): void {
    this.dialogService.open(CreateOrderDialogComponent)
      .onClose
      .subscribe(result => {
        if (result) {
          console.log(result);
          const parameters = {
            ...result,
            entityUuid: this.store.value.currentEntity.uuid
          }
          this.orderService.create(parameters)
            .subscribe({
              next: (createdOrder) => {
                this.refreshDataSource([createdOrder]);
                this.toastrService.success(this.translate.instant('order.creation-succeed'))
              },
              error: () => this.toastrService.danger(this.translate.instant('order.creation-failed'), this.translate.instant('errors.title'))
            })
        }
      })
  }
}
