import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbStepChangeEvent } from '@nebular/theme';
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
    number: [null, Validators.required],
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
  
  handleStepChange(event: NbStepChangeEvent) {
    console.log(event);
  }

  get isNextButtonDisabled(): boolean {
    return true;
    /*console.log(this.stepper.selectedIndex);
    console.log(this.stepper.steps);
    if (this.stepper.selectedIndex === 0) {
      return this.clientInfoForm.valid
    }
    return false;*/
  }
  
  get nextButtonText(): string {
    return 'dd'
    /*if (this.stepper.selectedIndex !== this.stepper.steps.length-1) {
      return this.translate.instant('actions.next');
    } else {
      return this.translate.instant('actions.create');
    }*/
  }

  get isFirstNameRequiredInput(): boolean {
    return true;
  }

  get canSubmit(): boolean {
    if (!this.hasCarStep && !this.hasAddressStep && this.clientInfoForm.valid) return true;
    if (this.hasCarStep && this.clientInfoForm.valid && this.carInfoForm.valid) return true;
    return this.hasAddressStep && this.clientInfoForm.valid && this.addressInfoForm.valid;
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
  
  onFirstSubmit(): void {
  
  }
  
  onSecondSubmit() {
  
  }
  
  onThirdSubmit() {
  
  }
  
  onSubmitStep() {
  
  }
}
