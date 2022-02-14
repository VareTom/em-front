import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { EntitiesComponent } from './containers/entities/entities.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  { path: '', component: EntitiesComponent}
]

@NgModule({
  declarations: [
    // Containers
    EntitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class EntitiesModule { }
