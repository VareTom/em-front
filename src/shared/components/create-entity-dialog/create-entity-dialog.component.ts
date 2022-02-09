import { Component } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';

// Services
import { EntityService } from 'src/shared/services/entity.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-entity-dialog',
  templateUrl: './create-entity-dialog.component.html',
  styleUrls: ['./create-entity-dialog.component.scss']
})
export class CreateEntityDialogComponent {
  
  isSubmitted: boolean = false;
  errorMessages: string;
  entityForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['']
  })
  
  constructor(protected dialogRef: NbDialogRef<CreateEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private store: Store,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private readonly entityService: EntityService) { }
  
  isRequiredInputInvalid(formControlName: string): boolean {
    const formControl = this.entityForm.controls[formControlName];
    return formControl.invalid && formControl.touched;
  }
  
  onClose() {
    this.dialogRef.close();
  }
  
  onSubmit() {
    this.isSubmitted = true;
    
    const entityInput = {
      ...this.entityForm.value,
      authorUuid: this.store.value.connectedUser.uuid
    }
    setTimeout(() => {
      this.isSubmitted = false;
    }, 1000);
    console.log(this.store.value.connectedUser);
    this.entityService.create(entityInput).subscribe(() => {
      this.isSubmitted = false;
      this.toastrService.success(this.translate.instant('entity.creation-succeed'));
      this.dialogRef.close();
    }, (err) => {
      this.isSubmitted = false;
      this.toastrService.danger(this.translate.instant('errors.basic-failed'),this.translate.instant('errors.title'));
    });
    
  }
}
