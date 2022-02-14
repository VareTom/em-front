import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

// Service
import { AuthService } from './services/auth.service';
import { AuthGuardService } from 'src/shared/guards/auth-guard.service';
import { EntityService } from 'src/shared/services/entity.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/shared/services/user.service';
import { ExpenditureService } from 'src/shared/services/expenditure.service';
import { ServiceService } from 'src/shared/services/service.service';

// Modules Nebular
import {
  NbAlertModule,
  NbButtonModule,
  NbTreeGridModule,
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
  NbThemeModule, NbMenuModule, NbDialogModule, NbToastrModule, NbGlobalLogicalPosition, NbDatepickerModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateEntityDialogComponent } from './components/create-entity-dialog/create-entity-dialog.component';

const nebularToastrConfig = {
  position: NbGlobalLogicalPosition.BOTTOM_END,
  duration: 5000,
  preventDuplicates: true
}

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
    NbToastrModule.forRoot(nebularToastrConfig),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbEvaIconsModule,
    NbSpinnerModule,
    NbButtonModule,
    NbAlertModule,
    NbFormFieldModule,
    NbTreeGridModule,
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
    NbDatepickerModule,
    NbButtonModule,
    NbThemeModule,
    NbEvaIconsModule,
    NbTreeGridModule,
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
        JwtHelperService,
        AuthService,
        EntityService,
        ExpenditureService,
        ServiceService,
        UserService,

        // Guards
        AuthGuardService
      ]
    }
  }
}
