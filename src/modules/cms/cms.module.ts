import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

// Components


// Modules
import { SharedModule } from 'src/shared/shared.module';

// Containers
import { CmsComponent } from './components/cms/cms.component';

const routes: Routes = [
  { path: '', component: CmsComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]}
]

@NgModule({
  declarations: [
    CmsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Modules
    SharedModule.forRoot()
  ]
})
export class CmsModule { }
