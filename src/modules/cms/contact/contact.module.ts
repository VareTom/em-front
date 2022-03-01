import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { ContactComponent } from './containers/contact/contact.component';

// Components

const routes: Routes = [
  { path: '', component: ContactComponent}
]

@NgModule({
  declarations: [
    
    // Containers
    ContactComponent
    
    // Components
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    SharedModule
  ]
})
export class ContactModule { }
