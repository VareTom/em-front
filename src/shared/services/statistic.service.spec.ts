import { TestBed } from '@angular/core/testing';

import { StatisticService } from 'src/shared/services/statistic.service';

describe('DashboardService', () => {
  let service: StatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
