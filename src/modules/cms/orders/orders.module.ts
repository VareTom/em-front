import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { OrdersComponent } from './containers/orders/orders.component';

// Custom Modules
import { SharedModule } from 'src/shared/shared.module';
import { CreateOrderDialogComponent } from './components/create-order-dialog/create-order-dialog.component';
import { ConfirmationValidationDialogComponent } from './components/confirmation-validation-dialog/confirmation-validation-dialog.component';

const routes: Routes = [
  { path: '', component: OrdersComponent }
]

@NgModule({
  declarations: [
    // Containers
    OrdersComponent,
    
    // Components
    CreateOrderDialogComponent,
    ConfirmationValidationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule
  ]
})
export class OrdersModule { }
