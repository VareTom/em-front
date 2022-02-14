import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [
    // Containers
    DashboardComponent,
    
    // Components
    NewUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class DashboardModule { }
