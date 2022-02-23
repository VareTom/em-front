import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationValidationDialogComponent } from './confirmation-validation-dialog.component';

describe('ConfirmationValidationDialogComponent', () => {
  let component: ConfirmationValidationDialogComponent;
  let fixture: ComponentFixture<ConfirmationValidationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationValidationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
