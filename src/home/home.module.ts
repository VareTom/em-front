import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './containers/home/home.component';

// Modules
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class HomeModule { }
