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
import { ServiceService } from 'src/shared/services/service.service';

// Models
import { Service } from 'src/shared/models/service';

// Components
import {
  CreateServiceDialogComponent
} from 'src/modules/cms/services/components/create-service-dialog/create-service-dialog.component';
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  
  customColumn = 'actions';
  defaultColumns = [ 'name', 'code', 'description', 'priceInCent' ];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly serviceService: ServiceService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    if (this.store.value.currentEntity) {
      this.getServices();
    }
  }
  
  private getServices(): void {
    this.serviceService.getAllForEntity()
      .subscribe({
        next: (services) => {
          if (services.length > 0) {
            this.refreshDataSource(services);
          } else {
            this.dataSource.setData([]);
          }
        },
        error: () => this.toastrService.danger(this.translate.instant('service.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  private refreshDataSource(services: Service[]): void {
    services.forEach(service => {
      this.data.push({
        data: {
          uuid: service.uuid,
          name: service.name,
          code: service.code ?? '-',
          description: service.description ?? '-',
          priceInCent: (service.priceInCent / 100).toFixed(2) + ' €'
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onCreate(): void {
    this.dialogService.open(CreateServiceDialogComponent)
      .onClose
      .subscribe((result: Service) => {
        if (result) {
          this.refreshDataSource([result]);
        }
      })
  }
  
  onDelete(service: Service): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.serviceService.delete(service.uuid)
          .subscribe({
            next: () => {
              this.data = this.data.filter(s => s.data.uuid !== service.uuid);
              this.dataSource.setData(this.data);
              this.toastrService.success(this.translate.instant('service.deletion-succeed'));
            },
            error: () => this.toastrService.danger(this.translate.instant('service.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
  
  onEdit(service: Service): void {
    this.dialogService.open(CreateServiceDialogComponent, {
      context: {
        serviceToUpdate: service
      }
    })
      .onClose
      .subscribe((result: Service) => {
        if (result) {
          this.data = this.data.filter(s => s.data.uuid !== result.uuid);
          this.refreshDataSource([result]);
        }
      })
  }
}
