import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';

// Services
import { ClientService } from 'src/shared/services/client.service';

// Models
import { Client } from 'src/shared/models/client';
import { Car } from 'src/shared/models/car';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';
import { Address } from 'src/shared/models/address';
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';
import {
  ClientInfoDialogComponent
} from 'src/modules/cms/clients/components/client-info-dialog/client-info-dialog.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;
  
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;
  
  constructor(
    private store: Store,
    private router: Router,
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private readonly clientService: ClientService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
    
    if (this.route.snapshot.paramMap.get('uuid')) {
      this.getClient(this.route.snapshot.paramMap.get('uuid'));
    } else {
      this.toastrService.danger(null, this.translate.instant('client.details.no-client'));
      this.router.navigateByUrl('clients');
    }
  }
  
  private getClient(uuid: string): void {
    this.clientService.getByUuid(uuid)
      .subscribe({
        next: (client) => {
          this.client = client;
        },
        error: () => {
          this.toastrService.danger(null, this.translate.instant('client.details.retrieve-failed'));
        }
      })
  }
  
  onBack(): void {
    this.router.navigateByUrl('clients');
  }
  
  onAddCar(): void {
  
  }
  
  onCreateAddress(): void {
  
  }
  
  onEditClient(client: Client): void {
    const dialogRef = this.dialogService.open(ClientInfoDialogComponent, {
      context: {
        clientToUpdate: client
      }
    });
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.clientService.update(client.uuid,result)
          .subscribe({
            next: (updatedClient) => {
              this.client = updatedClient;
              this.toastrService.success(null, this.translate.instant('client.update-succeed'));
            },
            error: () => this.toastrService.danger(null, this.translate.instant('client.update-failed'))
          })
      }
    })
  }
  
  onEditAddress(address: Address): void {
  
  }
  
  onEditCar(car: Car): void {
  
  }
  
  onDeleteCar(car: Car): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.clientService.deleteClientCar(this.client.uuid,car.uuid)
          .subscribe({
            next: () => {
              this.client.cars = this.client.cars.filter(c => c.uuid !== car.uuid);
              this.toastrService.success(null, this.translate.instant('car.deletion-succeed'));
            },
            error: () => this.toastrService.danger(null, this.translate.instant('car.deletion-failed'))
          })
      }
    })
  }
  
  onDeleteAddress(): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.clientService.deleteClientAddress(this.client.uuid)
          .subscribe({
            next: () => {
              delete this.client.address;
              this.toastrService.success(null, this.translate.instant('address.deletion-succeed'));
              this.router.navigateByUrl('clients');
            },
            error: () => this.toastrService.danger(null, this.translate.instant('address.deletion-failed'))
          })
      }
    })
  }
  
  onDeleteClient(client: Client): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.clientService.delete(client.uuid)
          .subscribe({
            next: () => {
              this.toastrService.success(null, this.translate.instant('client.deletion-succeed'));
              this.router.navigateByUrl('clients');
            },
            error: () => this.toastrService.danger(null, this.translate.instant('client.deletion-failed'))
          })
      }
    })
  }
}
