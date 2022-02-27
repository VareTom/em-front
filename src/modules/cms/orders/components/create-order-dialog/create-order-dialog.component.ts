import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';

// Models
import { SelectViewModel } from 'src/shared/models/selectViewModel';
import { Order } from 'src/shared/models/order';

// Services
import { ServiceService } from 'src/shared/services/service.service';
import { ClientService } from 'src/shared/services/client.service';
import { OrderService } from 'src/shared/services/order.service';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {
  orderToUpdate: Order;
  
  services: SelectViewModel[];
  clients: SelectViewModel[];
  
  orderForm: FormGroup = this.formBuilder.group({
    servicesUuid: [null, Validators.required],
    clientUuid: [null, Validators.required],
    durationInMinute: [null],
    performedAt: [null]
  });
  isSubmitted: boolean = false;
  submitButtonText: string = this.translate.instant('actions.add');

  constructor(protected dialogRef: NbDialogRef<CreateOrderDialogComponent>,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private store: Store,
              private readonly serviceService: ServiceService,
              private readonly clientService: ClientService,
              private readonly orderService: OrderService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.store.value.currentEntity) {
      this.clientService.getAllForEntity()
        .subscribe(
          {
            next: (clients) => {
              this.clients = clients.map(client => new SelectViewModel({
                name: client.fullName,
                value: client.uuid
              }))
            },
            error: () => this.toastrService.danger(this.translate.instant('order.retrieve-client-failed'), this.translate.instant('errors.title'))
          }
        )
  
      this.serviceService.getAllForEntity()
        .subscribe(
          {
            next: (services) => {
              this.services = services.map(service => new SelectViewModel({
                name: service.name,
                value: service.uuid
              }))
            },
            error: () => this.toastrService.danger(this.translate.instant('order.retrieve-service-failed'), this.translate.instant('errors.title'))
          }
        )
    }
    
    if (this.orderToUpdate) {
      this.submitButtonText = this.translate.instant('actions.update');
      this.orderForm.patchValue({
        durationInMinute: this.orderToUpdate.duration.toString() !== '-' ?this.orderToUpdate.duration.toString().split(' ')[0]: null,
        performedAt: this.orderToUpdate.performedAt !== '-' ? this.orderToUpdate.performedAt: null,
        clientUuid: this.orderToUpdate.client.uuid ?? null,
        servicesUuid: this.orderToUpdate.services.map(service => service.uuid)
      });
    }
  }
  
  get isServicesRequired(): boolean {
    const formControl = this.orderForm.get('servicesUuid');
    return formControl.touched && formControl.getError('required');
  };
  
  get isClientRequired(): boolean {
    const formControl = this.orderForm.get('clientUuid');
    return formControl.touched && formControl.getError('required');
  };
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    this.isSubmitted = true;
    const parameters = {
      ...this.orderForm.value,
      entityUuid: this.store.value.currentEntity.uuid
    }
    
    if (this.orderToUpdate) {
      this.onUpdate(parameters);
    } else {
      this.onCreate(parameters);
    }
  }
  
  onCreate(createInput: any): void {
    this.orderService.create(createInput)
      .subscribe({
        next: (createdOrder) => {
          this.isSubmitted = false;
          this.toastrService.success(this.translate.instant('order.creation-succeed'));
          this.dialogRef.close(createdOrder);
        },
        error: () => {
          this.isSubmitted = false;
          this.toastrService.danger(this.translate.instant('order.creation-failed'), this.translate.instant('errors.title'));
        }
      })
  }
  
  onUpdate(updateInput: any): void {
    delete updateInput.entityUuid;
    this.orderService.update(this.orderToUpdate.uuid, updateInput)
      .subscribe({
        next: (orderUpdated) => {
          this.isSubmitted = false;
          this.toastrService.success(this.translate.instant('order.update-succeed'));
          this.dialogRef.close(orderUpdated);
        },
        error: () => {
          this.isSubmitted = false;
          this.toastrService.danger(this.translate.instant('order.update-failed'), this.translate.instant('errors.title'));
        }
      })
  }
}
