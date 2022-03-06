import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

// Services
import { ClientService } from 'src/shared/services/client.service';

// Models
import { Client } from 'src/shared/models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;
  // TODO:: get by uuid + backButton
  constructor(
    private store: Store,
    private router: Router,
    private translate: TranslateService,
    private readonly clientService: ClientService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('uuid')) {
      this.getClient(this.route.snapshot.queryParamMap.get('uuid'));
    } else {
      this.toastrService.danger(this.translate.instant('client.details.no-client'), this.translate.instant('errors.title'));
      this.router.navigateByUrl('clients');
    }
  }
  
  private getClient(uuid: string): void {
    this.clientService.getByUuid(uuid)
      .subscribe({
        next: (client) => {
          this.client = client;
        },
        error: () => {
          this.toastrService.danger(this.translate.instant('client.details.retrieve-failed'), this.translate.instant('errors.title'));
        }
      })
  }
  
  onBack() {
    this.router.navigateByUrl('clients');
  }
}
