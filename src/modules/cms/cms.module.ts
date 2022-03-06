import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

// Guards
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { SuperAdminGuard } from 'src/shared/guards/super-admin.guard';

// Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { CmsComponent } from './containers/cms/cms.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: CmsComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'expenditures', loadChildren: () => import('./expenditures/expenditures.module').then(m => m.ExpendituresModule) },
      { path: 'entities', loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule) },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
      { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
      { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
      { path: 'admin', canActivate: [SuperAdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
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
