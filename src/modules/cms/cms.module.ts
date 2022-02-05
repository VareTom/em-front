import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

// Guards
import {
  AuthGuardService as AuthGuard
} from 'src/shared/services/auth-guard.service';


// Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { CmsComponent } from './containers/cms/cms.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: CmsComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'entities', loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule) },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
      { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) }
    ]
  }
]

@NgModule({
  declarations: [
    // Containers
    CmsComponent,
    
    // Components
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Modules
    SharedModule.forRoot()
  ]
})
export class CmsModule { }
