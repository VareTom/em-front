import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthComponent } from './containers/auth/auth.component';

// Modules
import { SharedModule } from 'src/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path:'', pathMatch:'full', redirectTo: 'login' },
      { path:'register', component: RegisterComponent },
      { path:'login', component: LoginComponent },
    ]
  }
]

@NgModule({
  declarations: [
    // Containers
    AuthComponent,
    
    // Components
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Custom Modules
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
