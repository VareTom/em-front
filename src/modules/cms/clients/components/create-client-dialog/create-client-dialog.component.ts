import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  get isFirstNameRequiredInput(): boolean {
    return true;
  }

  get canSubmit(): boolean {
    if (!this.hasCarStep && )
    return this.clientInfoForm.valid;
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

  onSubmit(): void {

  }
}
