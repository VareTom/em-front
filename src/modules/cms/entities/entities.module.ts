import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { EntitiesComponent } from './containers/entities/entities.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

// Components
import { InviteMemberDialogComponent } from './components/invite-member-dialog/invite-member-dialog.component';

const routes: Routes = [
  { path: '', component: EntitiesComponent}
]

@NgModule({
  declarations: [
    // Containers
    EntitiesComponent,
    
    // Components
    InviteMemberDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class EntitiesModule { }
