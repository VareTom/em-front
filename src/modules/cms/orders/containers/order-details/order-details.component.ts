import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from 'src/store';
import { Observable } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';

// Services
import { OrderService } from 'src/shared/services/order.service';

// Models
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';
import { Order } from 'src/shared/models/order';
import {
  CreateOrderDialogComponent
} from 'src/modules/cms/orders/components/create-order-dialog/create-order-dialog.component';
import {
  ConfirmationValidationDialogComponent
} from 'src/modules/cms/orders/components/confirmation-validation-dialog/confirmation-validation-dialog.component';
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;
  
  order: Order;
  
  constructor(
    private readonly orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private store: Store,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
  
    if (this.route.snapshot.paramMap.get('uuid')) {
      console.log('oui')
      this.getOrder(this.route.snapshot.paramMap.get('uuid'));
    } else {
      this.toastrService.danger(null, this.translate.instant('order.details.no-order'));
      this.router.navigateByUrl('clients');
    }
  }
  
  private getOrder(uuid: string): void {
    this.orderService.getByUuid(uuid)
      .subscribe({
        next: (order) => this.order = order,
        error: () => this.toastrService.danger(null, this.translate.instant('order.details.retrieve-failed'))
      })
  }
  
  onEdit(): void {
    this.dialogService.open(CreateOrderDialogComponent,{
      context: {
        orderToUpdate: this.order
      }
    })
      .onClose
      .subscribe((result: Order) => {
        if (result) {
          this.order = result;
        }
      })
  }
  
  onBack(): void {
    this.router.navigateByUrl('orders');
  }
  
  onDelete(): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.orderService.delete(this.order.uuid)
          .subscribe({
            next: () => {
              this.toastrService.success(null, this.translate.instant('order.deletion-succeed'));
              this.router.navigateByUrl('orders');
            },
            error: () => this.toastrService.danger(null, this.translate.instant('order.deletion-failed'))
          })
      }
    })
  }
  
  onValidate(): void {
    const dialogRef = this.dialogService.open(ConfirmationValidationDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.orderService.validate(this.order.uuid)
          .subscribe({
            next: (order) => {
              this.order = order;
              this.toastrService.success(null, this.translate.instant('order.validation-succeed'));
            },
            error: (error) => {
              if (error.error.statusCode === 400) {
                this.toastrService.danger(null, this.translate.instant('order.validation-failed-already-validate'));
              } else {
                this.toastrService.danger(null, this.translate.instant('order.validation-failed'));
              }
            }
          })
      }
    })
  }
}
