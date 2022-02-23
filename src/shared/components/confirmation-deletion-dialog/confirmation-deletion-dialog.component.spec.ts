import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeletionDialogComponent } from 'src/shared/components/confirmation-deletion-dialog/confirmation-deletion-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDeletionDialogComponent;
  let fixture: ComponentFixture<ConfirmationDeletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeletionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
