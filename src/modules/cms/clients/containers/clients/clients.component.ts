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
import { TranslateService } from '@ngx-translate/core';
import { ClientService } from 'src/shared/services/client.service';

// Models
import { Client } from 'src/shared/models/client';
import {
  CreateClientDialogComponent
} from 'src/modules/cms/clients/components/create-client-dialog/create-client-dialog.component';

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
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly clientService: ClientService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
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
      .subscribe((result) => {
        if (result) {
          result.client.entityUuid = this.store.value.currentEntity.uuid;
          if (!result.car) delete result.car;
          if (!result.address) delete result.address;
          
          this.clientService.create(result)
            .subscribe({
              next: (createdClient) => {
                this.refreshDataSource([createdClient]);
                this.toastrService.success(this.translate.instant('client.creation-succeed'));
              },
              error: (error) => this.toastrService.danger(this.translate.instant('client.creation-failed'), this.translate.instant('errors.title'))
            })
        }
      })
  }
  
  onDelete(client: Client): void {
    console.log(client);
  }
  
  onEdit(client: Client): void {
    console.log(client);
  }
}
