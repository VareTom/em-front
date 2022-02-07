import { Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Store } from 'src/store';
import { NbComponentSize, NbDialogService, NbMenuService } from '@nebular/theme';
import { Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';

// Components
import { CreateEntityDialogComponent } from 'src/shared/components/create-entity-dialog/create-entity-dialog.component';

// Models
import { User } from 'src/shared/models/user';
import { Entity } from 'src/shared/models/entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  connectedUser$: Observable<User>;
  currentEntity$: Observable<Entity>;

  menuSize: NbComponentSize = 'small';
  menuEntities: any[] = [
    { title: 'empty entity' }
  ];

  constructor(private store: Store,
              private router: Router,
              private nbMenuService: NbMenuService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.currentEntity$ = this.store.select<Entity>('currentEntity');

    if (this.store.value.connectedUser &&
      this.store.value.connectedUser.entities &&
      this.store.value.connectedUser.entities.length > 0) {
        this.menuEntities = [];
        this.store.value.connectedUser.entities.forEach(entity => {
          this.menuEntities.push({
            title: entity.name,
            queryParams: { uuid: entity.uuid }
          });
        })
    }

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'entity-context-menu'),
        map(({ item: {queryParams}}) => queryParams),
      )
      .subscribe(queryParams => this.onEntitySwitch(queryParams));
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.store.set('connectedUser',undefined);
    this.router.navigateByUrl('login')
  }

  onSettings(): void {
    this.router.navigateByUrl('entities');
  }

  onCreateFirstEntity(): void {
    console.log(this.store.value.connectedUser)
    this.dialogService.open(CreateEntityDialogComponent, {
      dialogClass: 'medium-dialog'
    });
  }

  private onEntitySwitch(selectedEntity: Params): void {
    console.log(selectedEntity)
    // TODO:: find from user entities where name ===
  }
}
