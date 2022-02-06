import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityDialogComponent } from './create-entity-dialog.component';

describe('CreateEntityDialogComponent', () => {
  let component: CreateEntityDialogComponent;
  let fixture: ComponentFixture<CreateEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEntityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
