import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Containers
import { ServicesComponent } from './containers/services/services.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  { path: '', component: ServicesComponent }
]

@NgModule({
  declarations: [
    // Containers
    ServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class ServicesModule { }
