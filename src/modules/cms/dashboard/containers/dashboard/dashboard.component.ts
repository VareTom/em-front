import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';

// Services
import { StatisticService } from 'src/shared/services/statistic.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store,
              private statisticService: StatisticService,
              private toastrService: NbToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.statisticService.getAllForEntity()
      .subscribe({
        next: (statistics) => {
          console.log(statistics);
        },
        error: (error) => this.toastrService.danger(this.translate.instant('expenditure.retrieve-failed'), this.translate.instant('errors.title'))
      })
  }
  
  isNewUser(): boolean {
    return this.store.value.connectedUser.entities.length <= 0;
  }
}
