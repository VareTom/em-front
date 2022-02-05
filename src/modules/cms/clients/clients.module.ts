import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { ClientsComponent } from './containers/clients/clients.component';

const routes: Routes = [
  { path: '', component: ClientsComponent}
]

@NgModule({
  declarations: [
    
    // Containers
    ClientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    SharedModule
  ]
})
export class ClientsModule { }
