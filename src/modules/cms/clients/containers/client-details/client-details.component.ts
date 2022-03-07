import { Component, OnInit } from '@angular/core';
import { Store } from 'src/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

// Services
import { ClientService } from 'src/shared/services/client.service';

// Models
import { Client } from 'src/shared/models/client';
import { Car } from 'src/shared/models/car';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';
import { Address } from 'src/shared/models/address';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;
  
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;
  
  constructor(
    private store: Store,
    private router: Router,
    private translate: TranslateService,
    private readonly clientService: ClientService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
    
    if (this.route.snapshot.paramMap.get('uuid')) {
      this.getClient(this.route.snapshot.paramMap.get('uuid'));
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
  
  onBack(): void {
    this.router.navigateByUrl('clients');
  }
  
  onAddCar(): void {
  
  }
  
  onEditAddress(address: Address): void {
  
  }
  
  onEditCar(car: Car): void {
  
  }
  
  onDeleteCar(car: Car): void {
  
  }
  
  onDeleteAddress(address: Address): void {
  
  }
}
