import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';
import { TranslateService } from '@ngx-translate/core';
import { ExpenditureService } from 'src/shared/services/expenditure.service';

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
  isSubmitted: boolean = false;
  
  constructor(protected dialogRef: NbDialogRef<CreateExpenditureDialogComponent>,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private readonly expenditureService: ExpenditureService,
              private store: Store,
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
    this.isSubmitted = true;
    const expenditureInput = {
      name: this.expenditureForm.value.name,
      priceInCent: this.expenditureForm.value.priceInCent * 100,
      boughtAt: this.expenditureForm.value.boughtAt,
      entityUuid: this.store.value.currentEntity.uuid
    }
    this.expenditureService.create(expenditureInput)
      .subscribe({
        next: (expenditureCreated) => {
          this.isSubmitted = false;
          this.toastrService.success(this.translate.instant('expenditure.creation-succeed'));
          this.dialogRef.close(expenditureCreated);
        },
        error: (error) => {
          this.isSubmitted = false;
          this.toastrService.danger(this.translate.instant('expenditure.creation-failed'), this.translate.instant('errors.title'));
        }
      })
  }
}
