import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { Address } from 'src/shared/models/address';

@Component({
  selector: 'app-create-client-address-dialog',
  templateUrl: './create-client-address-dialog.component.html',
  styleUrls: ['./create-client-address-dialog.component.scss']
})
export class CreateClientAddressDialogComponent implements OnInit {

  addressToUpdate: Address;

  addressInfoForm: FormGroup = this.formBuilder.group({
    street: [null, Validators.required],
    postalCode: [null, Validators.required],
    locality: [null, Validators.required],
    country: [null, Validators.required],
    box: [null],
  })

  titleText: string = this.translate.instant('address.creation-title');
  submitButtonText: string = this.translate.instant('actions.add');

  constructor(protected dialogRef: NbDialogRef<CreateClientAddressDialogComponent>,
              private translate: TranslateService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.addressToUpdate) {
      this.titleText = this.translate.instant('address.update-title');
      this.submitButtonText = this.translate.instant('actions.update');
      this.addressInfoForm.patchValue(this.addressToUpdate);
    }
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

  onClose(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(this.addressInfoForm.value);
  }
}
