import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { OrdersComponent } from './containers/orders/orders.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  { path: '', component: OrdersComponent }
]

@NgModule({
  declarations: [
    // Containers
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class OrdersModule { }
