import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest, NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import moment from 'moment';
import { Store } from 'src/store';

// Services
import { ExpenditureService } from 'src/shared/services/expenditure.service';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Expenditure } from 'src/shared/models/expenditure';

// Components
import {
  CreateExpenditureDialogComponent
} from 'src/modules/cms/expenditures/components/create-expenditure-dialog/create-expenditure-dialog.component';

@Component({
  selector: 'app-expenditures',
  templateUrl: './expenditures.component.html',
  styleUrls: ['./expenditures.component.scss']
})
export class ExpendituresComponent implements OnInit {
  customColumn = 'actions';
  defaultColumns = [ 'name', 'boughtAt', 'priceInCent' ];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<any>;
  data: any[] = [];
  
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly expenditureService: ExpenditureService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    if (this.store.value.currentEntity) {
      this.expenditureService.getAllForEntity()
        .subscribe({
          next: (expenditures) => {
            if (expenditures.length > 0) this.refreshDataSource(expenditures);
          },
          error: (error) => this.toastrService.danger(this.translate.instant('expenditure.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  private refreshDataSource(expenditures: Expenditure[]): void {
    expenditures.forEach(expenditure => {
      this.data.push({
        data: {
          name: expenditure.name,
          boughtAt: expenditure.boughtAt ? moment(expenditure.boughtAt).format('DD/MM/YYYY'): '-',
          priceInCent: (expenditure.priceInCent / 100).toFixed(2) + ' €'
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onCreate(): void {
    this.dialogService.open(CreateExpenditureDialogComponent)
      .onClose
      .subscribe((result) => {
        if (result) {
          const expenditureInput = {
            name: result.name,
            priceInCent: result.priceInCent * 100,
            boughtAt: result.boughtAt,
            entityUuid: this.store.value.currentEntity.uuid
          }
          this.expenditureService.create(expenditureInput)
            .subscribe({
              next: (expenditureCreated) => {
                this.refreshDataSource([expenditureCreated])
                this.toastrService.success(this.translate.instant('expenditure.creation-succeed'))
              },
              error: (error) => {
                this.toastrService.danger(this.translate.instant('expenditure.creation-failed'), this.translate.instant('errors.title'))
              }
            })
        }
      })
  }
  
  onDelete(expenditure: Expenditure): void {
    console.log(expenditure);
  }
  
  onEdit(expenditure: Expenditure): void {
    console.log(expenditure);
  }
}
