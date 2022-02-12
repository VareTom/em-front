import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-create-service-dialog',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.scss']
})
export class CreateServiceDialogComponent implements OnInit {
  
  serviceForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    priceInCent: [null, Validators.required],
    code: [null],
    description: [null]
  })
  
  constructor(protected dialogRef: NbDialogRef<CreateServiceDialogComponent>,
              private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
  }
  
  get isNameRequiredInput(): boolean {
    const formControl = this.serviceForm.get('name');
    return formControl.touched && formControl.getError('required');
  }
  
  get isPriceRequiredInput(): boolean {
    const formControl = this.serviceForm.get('priceInCent');
    return formControl.touched && formControl.getError('required');
  }
  
  onClose():void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    this.dialogRef.close(this.serviceForm.value);
  }
}
