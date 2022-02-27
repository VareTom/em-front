import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest, NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Store } from 'src/store';
import moment from 'moment';

// Services
import { OrderService } from 'src/shared/services/order.service';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Order } from 'src/shared/models/order';

// Components
import {
  CreateOrderDialogComponent
} from 'src/modules/cms/orders/components/create-order-dialog/create-order-dialog.component';
import { ConfirmationDeletionDialogComponent } from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';
import {
  ConfirmationValidationDialogComponent
} from 'src/modules/cms/orders/components/confirmation-validation-dialog/confirmation-validation-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  customColumn = 'actions';
  defaultColumns = [ 'clientName', 'total', 'duration', 'serviceNumber', 'performedAt', 'validatedAt' ];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  toggleFilterLabel: string = this.translate.instant('filters.monthly');
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private readonly orderService: OrderService,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    if (this.store.value.currentEntity) {
      this.orderService.getAllForEntity()
        .subscribe({
          next: (orders) => {
            if (orders.length > 0) this.refreshDataSource(orders);
          },
          error: (error) => this.toastrService.danger(this.translate.instant('order.retrieve-failed'), this.translate.instant('errors.title'))
        })
    }
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
          uuid: order.uuid,
          client: order.client,
          clientName: order.client.fullName,
          total: (order.totalInCent/100).toFixed(2) + '€',
          duration: order.duration? order.duration + ' mins': '-',
          serviceNumber: order.services.length,
          services: order.services,
          performedAt: order.performedAt ? moment(order.performedAt).format('yyyy-MM-DD'): '-',
          validatedAt: order.validatedAt ? moment(order.validatedAt).format('yyyy-MM-DD'): '-',
          isValidated: !!order.validatedAt
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onCreate(): void {
    this.dialogService.open(CreateOrderDialogComponent)
      .onClose
      .subscribe((result: Order) => {
        if (result) {
          this.refreshDataSource([result]);
        }
      })
  }
  
  onDelete(order: Order): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.orderService.delete(order.uuid)
          .subscribe({
            next: () => {
              const orders = this.data.filter(o => o.data.uuid !== order.uuid);
              this.dataSource.setData(orders);
              this.toastrService.success(this.translate.instant('order.deletion-succeed'));
            },
            error: () => this.toastrService.danger(this.translate.instant('order.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
  
  onEdit(order: Order): void {
    this.dialogService.open(CreateOrderDialogComponent,{
      context: {
        orderToUpdate: order
      }
    })
      .onClose
      .subscribe((result: Order) => {
        if (result) {
          this.data = this.data.filter(o => o.data.uuid !== result.uuid);
          this.refreshDataSource([result]);
        }
      })
  }
  
  onValidate(order: Order): void {
    const dialogRef = this.dialogService.open(ConfirmationValidationDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.orderService.validate(order.uuid)
          .subscribe({
            next: () => {
              this.toastrService.success(this.translate.instant('order.validation-succeed'));
            },
            error: (error) => {
              if (error.error.statusCode === 400) {
                this.toastrService.danger(this.translate.instant('order.validation-failed-already-validate'), this.translate.instant('errors.title'))
              } else {
                this.toastrService.danger(this.translate.instant('order.validation-failed'), this.translate.instant('errors.title'))
              }
            }
          })
      }
    })
  }
  
  onToggleFilters(event: boolean): void {
    if (event) {
      this.toggleFilterLabel = this.translate.instant('filters.all-time');
    } else {
      this.toggleFilterLabel = this.translate.instant('filters.monthly');
    }
  }
}
