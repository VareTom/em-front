import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Car } from 'src/shared/models/car';

@Component({
  selector: 'app-create-client-car-dialog',
  templateUrl: './create-client-car-dialog.component.html',
  styleUrls: ['./create-client-car-dialog.component.scss']
})
export class CreateClientCarDialogComponent implements OnInit {

  carToUpdate: Car;

  carInfoForm: FormGroup = this.formBuilder.group({
    merch: [null, Validators.required],
    model: [null, Validators.required],
    plate: [null, Validators.required],
    year: [null],
    color: [null]
  })
  titleText: string = this.translate.instant('car.creation-title');
  submitButtonText: string = this.translate.instant('actions.add');

  constructor(
    protected dialogRef: NbDialogRef<CreateClientCarDialogComponent>,
    private translate: TranslateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.carToUpdate) {
      this.titleText = this.translate.instant('car.update-title');
      this.submitButtonText = this.translate.instant('actions.update');
      this.carInfoForm.patchValue(this.carToUpdate);
    }
  }

  get isMerchRequiredInput(): boolean {
    const formControl = this.carInfoForm.get('merch');
    return formControl.touched && formControl.getError('required');
  }

  get isModelRequiredInput(): boolean {
    const formControl = this.carInfoForm.get('model');
    return formControl.touched && formControl.getError('required');
  }

  get isPlateRequiredInput(): boolean {
    const formControl = this.carInfoForm.get('plate');
    return formControl.touched && formControl.getError('required');
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(this.carInfoForm.value);
  }
}
