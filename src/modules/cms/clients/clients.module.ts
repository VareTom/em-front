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

const routes: Routes = [
  { path: '', component: ClientsComponent}
]

@NgModule({
  declarations: [
    
    // Containers
    ClientsComponent,
    
    // Components
    CreateClientDialogComponent,
          ClientDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    SharedModule
  ]
})
export class ClientsModule { }
