import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';

// Services
import { StatisticService } from 'src/shared/services/statistic.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Statistic } from 'src/shared/models/statistic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  statistic: Statistic;

  constructor(private store: Store,
              private statisticService: StatisticService,
              private toastrService: NbToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.store.value.currentEntity) {
      this.statisticService.getAllForEntity()
        .subscribe({
          next: (statistic) => {
            console.log(statistic);
            this.statistic = statistic;
          },
          error: (error) => this.toastrService.danger(this.translate.instant('dashboard.retrieve-failed'), this.translate.instant('errors.title'))
        })
    }
  }
  
  get isNewUser(): boolean {
    return !this.store.value.currentEntity;
  }
}
