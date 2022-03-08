import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientCarDialogComponent } from './create-client-car-dialog.component';

describe('CreateClientCarDialogComponent', () => {
  let component: CreateClientCarDialogComponent;
  let fixture: ComponentFixture<CreateClientCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientCarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
