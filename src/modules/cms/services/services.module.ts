import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Containers
import { ServicesComponent } from './containers/services/services.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

// Components
import { CreateServiceDialogComponent } from './components/create-service-dialog/create-service-dialog.component';

const routes: Routes = [
  { path: '', component: ServicesComponent }
]

@NgModule({
  declarations: [
    // Containers
    ServicesComponent,
    
    // Components
    CreateServiceDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class ServicesModule { }
