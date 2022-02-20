import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbStepChangeEvent  } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.scss']
})
export class CreateClientDialogComponent implements OnInit {
  
  hasAddressStep: boolean = false;
  hasCarStep: boolean = false;

  clientInfoForm: FormGroup = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null],
    hasAddress: [false],
    hasCar: [false]
  })
  addressInfoForm: FormGroup = this.formBuilder.group({
    street: [null, Validators.required],
    postalCode: [null, Validators.required],
    locality: [null, Validators.required],
    country: [null, Validators.required],
    box: [null],
  })
  carInfoForm: FormGroup = this.formBuilder.group({
    merch: [null, Validators.required],
    model: [null, Validators.required],
    year: [null],
    color: [null]
  })

  constructor(protected dialogRef: NbDialogRef<CreateClientDialogComponent>,
              private translate: TranslateService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  
  get clientInfoStepNextButtonText(): string {
    if (!this.hasAddressStep && !this.hasCarStep) return this.translate.instant('actions.finish');
    return this.translate.instant('actions.next');
  }
  
  get isClientInfoLastStep(): boolean {
    return !this.hasAddressStep && !this.hasCarStep;
  }
  
  get carStepNextButtonText(): string {
    if (!this.hasAddressStep) return this.translate.instant('actions.finish');
    return this.translate.instant('actions.next');
  }
  
  get isCarLastStep(): boolean {
    return !this.hasAddressStep;
  }

  get isFirstNameRequiredInput(): boolean {
    const formControl = this.clientInfoForm.get('firstName');
    return formControl.touched && formControl.getError('required');
  }
  
  get isMerchRequiredInput(): boolean {
    const formControl = this.carInfoForm.get('merch');
    return formControl.touched && formControl.getError('required');
  }
  
  get isModelRequiredInput(): boolean {
    const formControl = this.carInfoForm.get('model');
    return formControl.touched && formControl.getError('required');
  }
  
  get isStreetRequiredInput(): boolean {
    const formControl = this.addressInfoForm.get('street');
    return formControl.touched && formControl.getError('required');
  }
  
  get isPostalCodeRequiredInput(): boolean {
    const formControl = this.addressInfoForm.get('postalCode');
    return formControl.touched && formControl.getError('required');
  }
  
  get isLocalityRequiredInput(): boolean {
    const formControl = this.addressInfoForm.get('locality');
    return formControl.touched && formControl.getError('required');
  }
  
  get isCountryRequiredInput(): boolean {
    const formControl = this.addressInfoForm.get('country');
    return formControl.touched && formControl.getError('required');
  }

  onToggleAddressChange(isChecked: boolean) {
    this.hasAddressStep = isChecked;
  }

  onToggleCarChange(isChecked: boolean) {
    this.hasCarStep = isChecked;
  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  onSubmit() {
    const parameters = {
      client: this.clientInfoForm.getRawValue(),
      address: this.hasAddressStep ? this.addressInfoForm.getRawValue(): null,
      car: this.hasCarStep ? this.carInfoForm.getRawValue(): null
    }
    this.dialogRef.close(parameters);
  }
}
