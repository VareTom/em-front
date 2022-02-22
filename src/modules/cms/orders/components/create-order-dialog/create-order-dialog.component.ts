import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { SelectViewModel } from 'src/shared/models/selectViewModel';

// Services
import { ServiceService } from 'src/shared/services/service.service';
import { ClientService } from 'src/shared/services/client.service';
import { Store } from 'src/store';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {
  
  services: SelectViewModel[];
  clients: SelectViewModel[];
  
  orderForm: FormGroup = this.formBuilder.group({
    servicesUuid: [null, Validators.required],
    clientUuid: [null, Validators.required],
    durationInMinute: [null],
    performedAt: [null]
  });
  

  constructor(protected dialogRef: NbDialogRef<CreateOrderDialogComponent>,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private store: Store,
              private readonly serviceService: ServiceService,
              private readonly clientService: ClientService,
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
    this.dialogRef.close(this.orderForm.value);
  }
}
