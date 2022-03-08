import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { ClientsComponent } from './containers/clients/clients.component';

// Components
import { CreateClientDialogComponent } from './components/create-client-dialog/create-client-dialog.component';
import { ClientDetailsComponent } from './containers/client-details/client-details.component';
import { CreateClientCarDialogComponent } from './components/create-client-car-dialog/create-client-car-dialog.component';
import { CreateClientAddressDialogComponent } from './components/create-client-address-dialog/create-client-address-dialog.component';
import { ClientInfoDialogComponent } from './components/client-info-dialog/client-info-dialog.component';

const routes: Routes = [
  { path: '', component: ClientsComponent},
  { path: ':uuid/details', component: ClientDetailsComponent}
]

@NgModule({
  declarations: [
    // Containers
    ClientsComponent,
    
    // Components
    CreateClientDialogComponent,
    ClientDetailsComponent,
    CreateClientCarDialogComponent,
    CreateClientAddressDialogComponent,
    ClientInfoDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    SharedModule
  ]
})
export class ClientsModule { }
