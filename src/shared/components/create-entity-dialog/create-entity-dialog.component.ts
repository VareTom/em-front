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
  
  entityForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    description: [ null ]
  })
  
  constructor(protected dialogRef: NbDialogRef<CreateEntityDialogComponent>,
              private formBuilder: FormBuilder,
              private store: Store) { }
  
  isRequiredInputInvalid(formControlName: string): boolean {
    const formControl = this.entityForm.controls[formControlName];
    return formControl.invalid && formControl.touched;
  }
  
  onClose() {
    this.dialogRef.close();
  }
  
  onSubmit() {
    const entityInput = {
      ...this.entityForm.value,
      authorUuid: this.store.value.connectedUser.uuid
    }
    this.dialogRef.close(entityInput);
  }
}
