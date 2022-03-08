import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest, NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Store } from 'src/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { TranslateService } from '@ngx-translate/core';
import { ClientService } from 'src/shared/services/client.service';

// Components
import {
  CreateClientDialogComponent
} from 'src/modules/cms/clients/components/create-client-dialog/create-client-dialog.component';
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';

// Models
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';
import { Client } from 'src/shared/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  
  customColumn = 'actions';
  defaultColumns = [ 'clientFullName', 'vehicleNumber', 'locality' ];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private router: Router,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly clientService: ClientService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
    
    if (this.store.value.currentEntity) {
      this.clientService.getAllForEntity()
        .subscribe({
          next: (clients) => {
            if (clients.length > 0) this.refreshDataSource(clients);
          },
          error: (error) => this.toastrService.danger(this.translate.instant('client.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  private refreshDataSource(clients: Client[]): void {
    clients.forEach(client => {
      this.data.push({
        data: {
          uuid: client.uuid,
          clientFullName: client.fullName,
          vehicleNumber: client.cars.length,
          locality: client.address?.locality ?? '-'
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onCreate(): void {
    this.dialogService.open(CreateClientDialogComponent)
      .onClose
      .subscribe((result: Client) => {
        if (result) {
          this.refreshDataSource([result]);
        }
      })
  }
  
  onDelete(client: Client): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.clientService.delete(client.uuid)
          .subscribe({
            next: () => {
              this.data = this.data.filter(c => c.data.uuid !== client.uuid);
              this.dataSource.setData(this.data);
              this.toastrService.success(null, this.translate.instant('client.deletion-succeed'));
            },
            error: () => this.toastrService.danger(this.translate.instant('client.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
  
  onEdit(client: Client): void {
    this.router.navigateByUrl(`clients/${client.uuid}/details`);
  }
}
