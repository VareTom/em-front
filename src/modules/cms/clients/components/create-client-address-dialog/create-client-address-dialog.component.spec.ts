import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientAddressDialogComponent } from './create-client-address-dialog.component';

describe('CreateClientAddressDialogComponent', () => {
  let component: CreateClientAddressDialogComponent;
  let fixture: ComponentFixture<CreateClientAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientAddressDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
