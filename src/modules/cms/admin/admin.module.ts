import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AdminComponent } from './containers/admin/admin.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';
import { InviteUserDialogComponent } from './components/invite-user-dialog/invite-user-dialog.component';

const routes: Routes = [
  { path: '', component: AdminComponent}
]

@NgModule({
  declarations: [
    // Containers
    AdminComponent,
    InviteUserDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  
    // Custom Modules
    SharedModule
  ]
})
export class AdminModule { }
