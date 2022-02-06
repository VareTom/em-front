import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';

// Services
import { EntityService } from 'src/shared/services/entity.service';

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
              private entityService: EntityService) { }
  
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
    this.entityService.create(entityInput).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      console.log(err)
    });
    
  }
}
