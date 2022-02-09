import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { ExpendituresComponent } from 'src/modules/cms/expenditures/containers/expenditures/expenditures.component';

const routes: Routes = [
  { path: '', component: ExpendituresComponent }
]

@NgModule({
  declarations: [
    // Containers
    ExpendituresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class ExpendituresModule { }
