import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest, NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Store } from 'src/store';
import moment from 'moment';

// Components
import { CreateEntityDialogComponent } from 'src/shared/components/create-entity-dialog/create-entity-dialog.component';

// Services
import { EntityService } from 'src/shared/services/entity.service';
import { TranslateService } from '@ngx-translate/core';
import { Entity } from 'src/shared/models/entity';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  
  customColumn = 'name';
  defaultColumns = ['description', 'createdAt'];
  allColumns = [this.customColumn, ...this.defaultColumns]
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  isSubmitted: boolean = false;

  constructor(private dialogService: NbDialogService,
              private store: Store,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private readonly entityService: EntityService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }

  ngOnInit(): void {
    this.entityService.getAllForUser().subscribe({
      next: (entities) => {
        this.refreshDataSource(entities);
      },
      error: () => this.toastrService.danger(this.translate.instant('entity.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  onCreate(): void {
    this.dialogService.open(CreateEntityDialogComponent, {
      dialogClass: 'medium-dialog'
    }).onClose.subscribe((result) => {
      if (result) {
        this.isSubmitted = true;
        this.entityService.create(result).subscribe({
          next: (result) => {
            this.refreshDataSource([result]);
            this.isSubmitted = false;
            this.toastrService.success(this.translate.instant('entity.creation-succeed'));
          },
          error: () => {
            this.isSubmitted = false;
            this.toastrService.danger(this.translate.instant('errors.basic-failed'), this.translate.instant('errors.title'));
          }
        });
      }
    });
    
  }
  
  private refreshDataSource(entities: Entity[]): void {
    entities.forEach((entity, index) => {
      this.data.push({
        data: {
          name: entity.name,
          description: entity.description ?? '-',
          createdAt: moment(entity.createdAt).format('DD-MM-YYYY HH:mm')
        },
        children: []
      })
      if (entity.members && entity.members.length > 0) {
        entity.members.forEach(member => {
          this.data[index].children.push({
            data: {
              name: member.email,
              description: '-',
              createdAt: moment(member.addAt).format('DD-MM-YYYY HH:mm'),
            }
          })
        })
      }
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
}
