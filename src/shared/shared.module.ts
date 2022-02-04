import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

// Service
import { AuthService } from './services/auth.service';

// Modules Nebular
import {
  NbAlertModule,
  NbButtonModule,
  NbInputModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbCardModule,
  NbThemeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
  
    // Components
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    
    // Nebular
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbSpinnerModule,
    NbButtonModule,
    NbAlertModule,
    NbCardModule,
    NbInputModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    
    // Nebular
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbThemeModule,
    NbEvaIconsModule,
    NbSpinnerModule,
    NbAlertModule,
    NbCardModule,
    NbInputModule,
    
    // Components
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
          // Services
          AuthService
      ]
    }
  }
}