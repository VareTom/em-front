import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';

// Services
import { ClientService } from 'src/shared/services/client.service';
import { AddressService } from 'src/shared/services/address.service';
import { CarService } from 'src/shared/services/car.service';

// Models
import { Client } from 'src/shared/models/client';
import { Car } from 'src/shared/models/car';
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';
import { Address } from 'src/shared/models/address';

// Components
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';
import {
  ClientInfoDialogComponent
} from 'src/modules/cms/clients/components/client-info-dialog/client-info-dialog.component';
import {
  CreateClientCarDialogComponent
} from 'src/modules/cms/clients/components/create-client-car-dialog/create-client-car-dialog.component';
import {
  CreateClientAddressDialogComponent
} from 'src/modules/cms/clients/components/create-client-address-dialog/create-client-address-dialog.component';

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
    private readonly carService: CarService,
    private readonly addressService: AddressService,
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
    const dialogRef = this.dialogService.open(CreateClientCarDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.carService.create(this.client.uuid, result)
          .subscribe({
            next: (client) => {
              this.client = client;
              this.toastrService.success(null, this.translate.instant('car.creation-succeed'));
            },
            error: () => this.toastrService.danger(null, this.translate.instant('car.creation-failed'))
          })
      }
    })
  }

  onCreateAddress(): void {
    const dialogRef = this.dialogService.open(CreateClientAddressDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.addressService.create(this.client.uuid, result)
          .subscribe({
            next: (client) => {
              this.client = client;
              this.toastrService.success(null, this.translate.instant('address.creation-succeed'));
            },
            error: () => this.toastrService.danger(null, this.translate.instant('address.creation-failed'))
          })
      }
    })
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
    const dialogRef = this.dialogService.open(CreateClientAddressDialogComponent, {
      context: {
        addressToUpdate: address
      }
    });
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.addressService.update(address.uuid, result)
          .subscribe({
            next: (client) => {
              this.client = client;
              this.toastrService.success(null, this.translate.instant('address.update-succeed'));
            },
            error: () => this.toastrService.danger(null, this.translate.instant('address.update-failed'))
          })
      }
    })
  }

  onEditCar(car: Car): void {
    const dialogRef = this.dialogService.open(CreateClientCarDialogComponent, {
      context: {
        carToUpdate: car
      }
    });
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.carService.update(this.client.uuid, car.uuid, result)
          .subscribe({
            next: (client) => {
              this.client = client;
              this.toastrService.success(null, this.translate.instant('car.update-succeed'));
            },
            error: () => this.toastrService.danger(null, this.translate.instant('car.update-failed'))
          })
      }
    })
  }

  onDeleteCar(car: Car): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.carService.delete(car.uuid)
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
        this.addressService.delete(this.client.address.uuid)
          .subscribe({
            next: () => {
              delete this.client.address;
              this.toastrService.success(null, this.translate.instant('address.deletion-succeed'));
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
