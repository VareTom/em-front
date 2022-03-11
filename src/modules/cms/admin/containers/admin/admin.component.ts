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

// Services
import { UserService } from 'src/shared/services/user.service';

// Models
import { User } from 'src/shared/models/user';
import { Router } from '@angular/router';
import { Expenditure } from 'src/shared/models/expenditure';
import moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  customColumn = 'actions';
  defaultColumns = [ 'name', 'entityName', 'isDisabled', 'isConfirmed', 'isSuperAdmin', 'createdAt' ];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private router: Router,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly userService: UserService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }

  ngOnInit(): void {
    if (this.store.value.connectedUser.isSuperAdmin) {
      this.getUsers();
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }
  
  private getUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: () => {
        
        },
        error: () => this.toastrService.danger(null, this.translate.instant('admin.retrieve-failed'))
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
  
  private refreshDataSource(users: User[]): void {
    this.data = [];
    users.forEach(user => {
      this.data.push({
        data: {
          uuid: user.uuid,
          email: user.email,
          createdAt: moment(user.createdAt).format('yyyy-MM-DD'),
          entityName: user.entity? user.entity.name: '-',
          isSuperAdmin: user.isSuperAdmin,
          isConfirmed: user.isConfirmed,
          isDisabled: user.isDisabled
        }
      });
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onDisabled(user: User): void {
  
  }
  
  onInvite(): void {
  
  }
}
