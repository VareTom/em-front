import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { CodeInputModule } from 'angular-code-input';

// Service
import { AuthService } from './services/auth.service';
import { AuthGuardService } from 'src/shared/guards/auth-guard.service';
import { EntityService } from 'src/shared/services/entity.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/shared/services/user.service';
import { ExpenditureService } from 'src/shared/services/expenditure.service';
import { ServiceService } from 'src/shared/services/service.service';
import { OrderService } from 'src/shared/services/order.service';
import { StatisticService } from 'src/shared/services/statistic.service';
import { ContactService } from 'src/shared/services/contact.service';

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
  NbSelectModule,
  NbThemeModule,
  NbMenuModule,
  NbDialogModule,
  NbToastrModule,
  NbGlobalLogicalPosition,
  NbDatepickerModule,
  NbToggleModule,
  NbStepperModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateEntityDialogComponent } from './components/create-entity-dialog/create-entity-dialog.component';
import { ConfirmationDeletionDialogComponent } from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';

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
    CreateEntityDialogComponent,
    ConfirmationDeletionDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule.forRoot({
      codeLength: 6
    }),
  
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

    // Nebular
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbToastrModule.forRoot(nebularToastrConfig),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbEvaIconsModule,
    NbSelectModule,
    NbToggleModule,
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
    NbDialogModule.forRoot({context: true}),
    NbStepperModule,
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    CodeInputModule,
  
    NgxEchartsModule,

    // Nebular
    NbLayoutModule,
    NbSidebarModule,
    NbDatepickerModule,
    NbButtonModule,
    NbThemeModule,
    NbToggleModule,
    NbEvaIconsModule,
    NbTreeGridModule,
    NbSelectModule,
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
    NbStepperModule,

    // Components
    FooterComponent,
    HeaderComponent,
    CreateEntityDialogComponent,
    ConfirmationDeletionDialogComponent
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
        OrderService,
        StatisticService,
        ContactService,

        // Guards
        AuthGuardService
      ]
    }
  }
}
