import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';

@Component({
  selector: 'app-create-expenditure-dialog',
  templateUrl: './create-expenditure-dialog.component.html',
  styleUrls: ['./create-expenditure-dialog.component.scss']
})
export class CreateExpenditureDialogComponent implements OnInit {
  
  expenditureForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    priceInCent: [null, Validators.required],
    boughtAt: [null]
  })
  
  constructor(protected dialogRef: NbDialogRef<CreateExpenditureDialogComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  
  get isNameRequiredInput(): boolean {
    const formControl = this.expenditureForm.get('name');
    return formControl.touched && formControl.getError('required');
  }
  
  get isPriceRequiredInput(): boolean {
    const formControl = this.expenditureForm.get('priceInCent');
    return formControl.touched && formControl.getError('required');
  }
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    this.dialogRef.close(this.expenditureForm.value);
  }
}
