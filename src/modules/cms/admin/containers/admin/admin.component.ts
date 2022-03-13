import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection, NbSortRequest,
  NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { Store } from 'src/store';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { Router } from '@angular/router';

// Services
import { UserService } from 'src/shared/services/user.service';

// Models
import { User } from 'src/shared/models/user';
import { Observable } from 'rxjs';
import {
  InviteUserDialogComponent
} from 'src/modules/cms/admin/components/invite-user-dialog/invite-user-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  customColumn = 'actions';
  defaultColumns = [ 'email', 'entityName', 'isDisabledString', 'isConfirmed', 'isSuperAdmin', 'createdAt' ];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  connectedUser$: Observable<User>;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private router: Router,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly userService: UserService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    
    if (this.store.value.connectedUser.isSuperAdmin) {
      this.getUsers();
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }
  
  private getUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (users) => {
          if (users.length > 0) {
            this.refreshDataSource(users);
          } else {
            this.dataSource.setData([]);
          }
        },
        error: () => this.toastrService.danger(null, this.translate.instant('admin.retrieve-failed'))
      })
  }
  
  tooltipDisabledText(user: User): string {
    if (user.isDisabled) {
      return this.translate.instant('actions.enabled');
    } else {
      return this.translate.instant('actions.disabled');
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
  
  private refreshDataSource(users: User[]): void {
    users.forEach(user => {
      this.data.push({
        data: {
          uuid: user.uuid,
          email: user.email,
          createdAt: moment(user.createdAt).format('yyyy-MM-DD'),
          entityName: user.entity? user.entity.name: '-',
          isConfirmed: user.isConfirmed ? this.translate.instant('global.yes'): this.translate.instant('global.no'),
          isSuperAdmin: user.isSuperAdmin ? this.translate.instant('global.yes'): this.translate.instant('global.no'),
          isDisabledString: user.isDisabled ? this.translate.instant('global.yes'): this.translate.instant('global.no'),
          isDisabled: user.isDisabled
        }
      });
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onDisabled(user: User): void {
    this.userService.disable(user.uuid)
      .subscribe({
        next: () => {
          if (user.isDisabled) {
            this.toastrService.success(null, this.translate.instant('admin.enabled-succeed'));
          } else {
            this.toastrService.success(null, this.translate.instant('admin.disabled-succeed'));
          }
          this.getUsers();
        },
        error: () => {
          if (user.isDisabled) {
            this.toastrService.danger(null, this.translate.instant('admin.enabled-failed'));
          } else {
            this.toastrService.danger(null, this.translate.instant('admin.disabled-failed'));
          }
        }
      })
  }
  
  onInvite(): void {
    const dialogRef = this.dialogService.open(InviteUserDialogComponent);
    dialogRef.onClose.subscribe((result: User) => {
      if (result) this.refreshDataSource([result]);
    })
  }
}
