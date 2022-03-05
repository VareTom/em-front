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
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';
import {
  CreateServiceDialogComponent
} from 'src/modules/cms/services/components/create-service-dialog/create-service-dialog.component';
import { Service } from 'src/shared/models/service';
import {
  InviteMemberDialogComponent
} from 'src/modules/cms/entities/components/invite-member-dialog/invite-member-dialog.component';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  
  customColumn = 'actions';
  defaultColumns = ['email', 'createdAt', 'isAdmin'];
  allColumns = [...this.defaultColumns]
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
    
    if (this.store.value.currentEntity.authorUuid === this.store.value.connectedUser.uuid) this.allColumns.push(this.customColumn);
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
          isConfirmed: member.isConfirmed,
          isAdmin: this.store.value.currentEntity.authorUuid === member.uuid ? this.translate.instant('global.yes') : this.translate.instant('global.no'),
          createdAt: moment(member.createdAt).format('DD-MM-YYYY HH:mm')
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onDelete(member: any): any {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.entityService.removeMember(member.uuid)
          .subscribe({
            next: () => {
              this.data = this.data.filter(m => m.data.uuid !== member.uuid);
              this.dataSource.setData(this.data);
              this.toastrService.success(this.translate.instant('entity.deletion-succeed'));
            },
            error: () => this.toastrService.danger(this.translate.instant('entity.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
  
  onInvite(): any {
    this.dialogService.open(InviteMemberDialogComponent)
      .onClose
      .subscribe((result: User) => {
        if (result) {
          this.refreshDataSource([result]);
        }
      })
  }
}
