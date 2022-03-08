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
      this.toastrService.danger(this.translate.instant('client.details.no-client'), this.translate.instant('errors.title'));
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
          this.toastrService.danger(this.translate.instant('client.details.retrieve-failed'), this.translate.instant('errors.title'));
        }
      })
  }
  
  onBack(): void {
    this.router.navigateByUrl('clients');
  }
  
  onAddCar(): void {
  
  }
  
  onEditAddress(address: Address): void {
  
  }
  
  onEditCar(car: Car): void {
  
  }
  
  onDeleteCar(car: Car): void {
  
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
            error: () => this.toastrService.danger(this.translate.instant('address.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
  
  onEditClient(client: Client): void {
  
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
            error: () => this.toastrService.danger(this.translate.instant('client.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
}
