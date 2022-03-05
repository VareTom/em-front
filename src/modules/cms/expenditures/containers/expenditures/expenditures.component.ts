import { Component, OnInit } from '@angular/core';
import {
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbToastrService,
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
import {
  ConfirmationDeletionDialogComponent
} from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';

// Enums
import { ToggleFilterValues } from 'src/shared/enums/ToggleFilterValues';

// Interfaces
import { FiltersInterface } from 'src/shared/interfaces/filters.interface';

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
  
  toggleFilterValue: ToggleFilterValues = ToggleFilterValues.MONTHLY;
  toggleFilterLabel: string = this.translate.instant('filters.monthly');
  
  constructor(private dialogService: NbDialogService,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly expenditureService: ExpenditureService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) { }
  
  ngOnInit(): void {
    if (this.store.value.currentEntity) {
      this.getExpenditures();
    }
  }
  
  private getExpenditures(): void{
    const filters: FiltersInterface = {
      period: this.toggleFilterValue
    }
    this.expenditureService.getAllForEntity(filters)
      .subscribe({
        next: (expenditures) => {
          if (expenditures.length > 0) {
            this.refreshDataSource(expenditures);
          } else {
            this.dataSource.setData([]);
          }
        },
        error: (error) => this.toastrService.danger(this.translate.instant('expenditure.retrieve-failed'), this.translate.instant('errors.title'))
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
  
  private refreshDataSource(expenditures: Expenditure[]): void {
    this.data = [];
    expenditures.forEach(expenditure => {
      this.data.push({
        data: {
          uuid: expenditure.uuid,
          name: expenditure.name,
          boughtAt: expenditure.boughtAt ? moment(expenditure.boughtAt).format('yyyy-MM-DD'): '-',
          priceInCent: (expenditure.priceInCent / 100).toFixed(2) + ' €'
        }
      })
    })
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  
  onCreate(): void {
    this.dialogService.open(CreateExpenditureDialogComponent)
      .onClose
      .subscribe((result: Expenditure) => {
        if (result) {
          this.refreshDataSource([result]);
        }
      })
  }
  
  onDelete(expenditure: Expenditure): void {
    const dialogRef = this.dialogService.open(ConfirmationDeletionDialogComponent);
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.expenditureService.delete(expenditure.uuid)
          .subscribe({
            next: () => {
              this.data = this.data.filter(ex => ex.data.uuid !== expenditure.uuid);
              this.dataSource.setData(this.data);
              this.toastrService.success(this.translate.instant('expenditure.deletion-succeed'));
            },
            error: () => this.toastrService.danger(this.translate.instant('expenditure.deletion-failed'), this.translate.instant('errors.title'))
          })
      }
    })
  }
  
  onEdit(expenditure: Expenditure): void {
    console.log(expenditure);
    this.dialogService.open(CreateExpenditureDialogComponent, {
      context: {
        expenditureToUpdate: expenditure
      }
    })
      .onClose
      .subscribe((result: Expenditure) => {
        if (result) {
          this.data = this.data.filter(e => e.data.uuid !== result.uuid);
          this.refreshDataSource([result]);
        }
      })
  }
  
  onToggleFilters(event: boolean): void {
    if (event) {
      this.toggleFilterLabel = this.translate.instant('filters.all-time');
      this.toggleFilterValue = ToggleFilterValues.ALL_TIME;
    } else {
      this.toggleFilterLabel = this.translate.instant('filters.monthly');
      this.toggleFilterValue = ToggleFilterValues.MONTHLY;
    }
    this.getExpenditures();
  }
}
