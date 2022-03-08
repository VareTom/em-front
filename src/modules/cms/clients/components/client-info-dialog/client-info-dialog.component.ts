import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

// Models
import { Client } from 'src/shared/models/client';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-info-dialog',
  templateUrl: './client-info-dialog.component.html',
  styleUrls: ['./client-info-dialog.component.scss']
})
export class ClientInfoDialogComponent implements OnInit {
  
  clientToUpdate: Client;
  
  clientInfoForm: FormGroup = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null]
  })
  submitButtonText: string = this.translate.instant('actions.create');
  
  constructor(protected dialogRef: NbDialogRef<ClientInfoDialogComponent>,
              private translate: TranslateService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.clientToUpdate) {
      this.submitButtonText = this.translate.instant('actions.update');
      this.clientInfoForm.patchValue({
        firstName: this.clientToUpdate.firstName,
        lastName: this.clientToUpdate.lastName
      })
    }
  }
  
  get isFirstNameRequiredInput(): boolean {
    const formControl = this.clientInfoForm.get('firstName');
    return formControl.touched && formControl.getError('required');
  }
  
  onSubmit(): void {
    this.dialogRef.close(this.clientInfoForm.value);
  }
  
  onClose(): void {
    this.dialogRef.close(false);
  }
}
