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

// Services
import { EntityService } from 'src/shared/services/entity.service';
import { TranslateService } from '@ngx-translate/core';

// Models
import { User } from 'src/shared/models/user';
import { Observable } from 'rxjs';
import { Entity } from 'src/shared/models/entity';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  
  customColumn = 'actions';
  defaultColumns = ['email', 'createdAt', 'isAdmin'];
  allColumns = [...this.defaultColumns, this.customColumn]
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  isSubmitted: boolean = false;
  
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;

  constructor(private dialogService: NbDialogService,
              private store: Store,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private readonly entityService: EntityService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
    
    this.entityService.getMembers().subscribe({
      next: (members) => {
        this.refreshDataSource(members);
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
  
  private refreshDataSource(members: User[]): void {
    members.forEach((member) => {
      this.data.push({
        data: {
          uuid: member.uuid,
          email: member.email,
          isAdmin: this.store.value.currentEntity.authorUuid === member.uuid ? this.translate.instant('global.yes') : this.translate.instant('global.no'),
          createdAt: moment(member.createdAt).format('DD-MM-YYYY HH:mm')
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onDelete(member: any) {
  
  }
}
