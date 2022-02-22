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
      this.serviceService.getAllForEntity()
        .subscribe({
          next: (services) => {
            if (services.length > 0) this.refreshDataSource(services);
          },
          error: () => this.toastrService.danger(this.translate.instant('service.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  private refreshDataSource(services: Service[]): void {
    services.forEach(service => {
      this.data.push({
        data: {
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
      .subscribe((result) => {
        if (result) {
          const serviceInput = {
            name: result.name,
            priceInCent: result.priceInCent * 100,
            code: result.code,
            description: result.description,
            entityUuid: this.store.value.currentEntity.uuid
          }
          this.serviceService.create(serviceInput)
            .subscribe({
              next: (serviceCreated) => {
                this.refreshDataSource([serviceCreated])
                this.toastrService.success(this.translate.instant('service.creation-succeed'))
              },
              error: (error) => {
                this.toastrService.danger(this.translate.instant('service.creation-failed'), this.translate.instant('errors.title'))
              }
            })
        }
      })
  }
  
  onDelete(service: Service): void {
    console.log(service);
  }
  
  onEdit(service: Service): void {
    console.log(service);
  }
}
