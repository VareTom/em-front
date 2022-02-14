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
  
  defaultColumns = [ 'firstName', 'lastName', 'options', 'locality' ];
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
    this.clientService.getAllForEntity(this.store.value.currentEntity.uuid)
      .subscribe({
        next: (clients) => {
          if (clients.length > 0) this.refreshDataSource(clients);
        },
        error: (error) => this.toastrService.danger(this.translate.instant('client.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  private refreshDataSource(clients: Client[]): void {
    clients.forEach(client => {
      this.data.push({
        data: {
          firstName: client.firstName,
          lastName: client.lastName,
          options: client.options,
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
          const clientInput = {
            client: {
              entityUuid: ''
            }
          }
          clientInput.client.entityUuid = this.store.value.currentEntity.uuid;
           
           // TODO:: add entityUuid in client object
          this.clientService.create(clientInput)
        }
      })
  }
  
}
