import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

// Service
import { AuthService } from './services/auth.service';
import { AuthGuardService } from 'src/shared/services/auth-guard.service';
import { EntityService } from 'src/shared/services/entity.service';
import { JwtHelperService } from '@auth0/angular-jwt';

// Modules Nebular
import {
  NbAlertModule,
  NbButtonModule,
  NbFormFieldModule,
  NbInputModule,
  NbLayoutModule,
  NbContextMenuModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbCardModule,
  NbActionsModule,
  NbUserModule,
  NbIconModule,
  NbTooltipModule,
  NbThemeModule, NbMenuModule, NbDialogModule
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateEntityDialogComponent } from './components/create-entity-dialog/create-entity-dialog.component';

@NgModule({
  declarations: [
  
    // Components
    FooterComponent,
    HeaderComponent,
    CreateEntityDialogComponent
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
    NbFormFieldModule,
    NbCardModule,
    NbActionsModule,
    NbIconModule,
    NbTooltipModule,
    NbContextMenuModule,
    NbUserModule,
    NbInputModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
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
    NbActionsModule,
    NbFormFieldModule,
    NbIconModule,
    NbTooltipModule,
    NbContextMenuModule,
    NbUserModule,
    NbInputModule,
    NbMenuModule,
    NbDialogModule,
    
    // Components
    FooterComponent,
    HeaderComponent,
    CreateEntityDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        // Services
        AuthService,
        JwtHelperService,
        EntityService,
        
        // Guards
        AuthGuardService
      ]
    }
  }
}