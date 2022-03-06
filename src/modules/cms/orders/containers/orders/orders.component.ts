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
import { Observable } from 'rxjs';

// Services
import { OrderService } from 'src/shared/services/order.service';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Order } from 'src/shared/models/order';
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';

// Components
import {
  CreateOrderDialogComponent
} from 'src/modules/cms/orders/components/create-order-dialog/create-order-dialog.component';
import { ConfirmationDeletionDialogComponent } from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';
import {
  ConfirmationValidationDialogComponent
} from 'src/modules/cms/orders/components/confirmation-validation-dialog/confirmation-validation-dialog.component';

// Enums
import { ToggleFilterValues } from 'src/shared/enums/ToggleFilterValues';

// Interfaces
import { FiltersInterface } from 'src/shared/interfaces/filters.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  customColumn = 'actions';
  defaultColumns = [ 'clientName', 'total', 'duration', 'serviceNumber', 'performedAt', 'validatedAt', 'createdAt'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  toggleFilterValue: ToggleFilterValues = ToggleFilterValues.MONTHLY;
  toggleFilterLabel: string = this.translate.instant('filters.monthly');
  
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private readonly orderService: OrderService,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
    
    if (this.store.value.currentEntity) {
      this.getOrders();
    }
  }
  
  private getOrders(): void {
    const filters: FiltersInterface = {
      period: this.toggleFilterValue
    }
    this.orderService.getAllForEntity(filters)
      .subscribe({
        next: (orders) => {
          if (orders.length > 0) {
            this.refreshDataSource(orders);
          } else {
            this.dataSource.setData([]);
          }
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
    this.data = [];
    orders.forEach(order => {
      this.data.push(this.createDataObject(order));
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  private createDataObject (order: Order): any {
    return {
      data: {
        uuid: order.uuid,
        client: order.client,
        clientName: order.client.fullName,
        total: (order.totalInCent/100).toFixed(2) + '€',
        duration: order.duration? order.duration + ' mins': '-',
        serviceNumber: order.services.length,
        services: order.services,
        createdAt: moment(order.createdAt).format('yyyy-MM-DD'),
        performedAt: order.performedAt ? moment(order.performedAt).format('yyyy-MM-DD'): '-',
        validatedAt: order.validatedAt ? moment(order.validatedAt).format('yyyy-MM-DD'): '-',
        isValidated: !!order.validatedAt
      }
    }
  }
  
  onCreate(): void {
    this.dialogService.open(CreateOrderDialogComponent)
      .onClose
      .subscribe((result: Order) => {
        if (result) {
          this.data.push(this.createDataObject(result));
          this.dataSource = this.dataSourceBuilder.create(this.data);
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
              this.data = this.data.filter(o => o.data.uuid !== order.uuid);
              this.dataSource.setData(this.data);
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
          this.data.push(this.createDataObject(result));
          this.dataSource = this.dataSourceBuilder.create(this.data);
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
      this.toggleFilterValue = ToggleFilterValues.ALL_TIME;
    } else {
      this.toggleFilterLabel = this.translate.instant('filters.monthly');
      this.toggleFilterValue = ToggleFilterValues.MONTHLY;
    }
    this.getOrders();
  }
}
