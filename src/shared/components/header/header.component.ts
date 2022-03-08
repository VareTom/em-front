import { Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Store } from 'src/store';
import { NbComponentSize, NbDialogService, NbMenuService, NbToastrService } from '@nebular/theme';
import { Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';

// Components
import { CreateEntityDialogComponent } from 'src/shared/components/create-entity-dialog/create-entity-dialog.component';

// Models
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';

// Services
import { AuthService } from 'src/shared/services/auth.service';
import { EntityService } from 'src/shared/services/entity.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;

  menuSize: NbComponentSize = 'small';

  constructor(private store: Store,
              private router: Router,
              private translate: TranslateService,
              private readonly authService: AuthService,
              private toastrService: NbToastrService,
              private readonly entityService: EntityService,
              private nbMenuService: NbMenuService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');
  }

  onLogout(): void {
    this.authService.onLogout();
  }

  onSettings(): void {
    this.router.navigateByUrl('entities');
  }

  onCreateFirstEntity(): void {
    this.dialogService.open(CreateEntityDialogComponent)
      .onClose
      .subscribe((result) => {
        if (result) {
          this.entityService.create(result).subscribe({
            next: (result) => {
              this.toastrService.success(null, this.translate.instant('entity.creation-succeed'));
            },
            error: () => {
              this.toastrService.danger(null, this.translate.instant('errors.basic-failed'));
            }
          });
        }
    });
  }
  
  onAdminSide(): void {
    this.router.navigateByUrl('admin');
  }
}
