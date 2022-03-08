import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Store } from 'src/store';

// Services
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from 'src/shared/services/service.service';

// Models
import { Service } from 'src/shared/models/service';

@Component({
  selector: 'app-create-service-dialog',
  templateUrl: './create-service-dialog.component.html',
  styleUrls: ['./create-service-dialog.component.scss']
})
export class CreateServiceDialogComponent implements OnInit {
  serviceToUpdate: Service
  
  serviceForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    priceInCent: [null, Validators.required],
    code: [null],
    description: [null]
  })
  isSubmitted: boolean = false;
  submitButtonText: string = this.translate.instant('actions.create');
  
  constructor(protected dialogRef: NbDialogRef<CreateServiceDialogComponent>,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly serviceService: ServiceService,
              private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    if (this.serviceToUpdate) {
      this.submitButtonText = this.translate.instant('actions.update');
      this.serviceForm.patchValue({
        name: this.serviceToUpdate.name,
        priceInCent: +this.serviceToUpdate.priceInCent.toString().split('€')[0],
        code: this.serviceToUpdate.code,
        description: this.serviceToUpdate.description
      })
    }
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
    this.isSubmitted = true;
    const serviceInput = {
      name: this.serviceForm.value.name,
      priceInCent: this.serviceForm.value.priceInCent * 100,
      code: this.serviceForm.value.code,
      description: this.serviceForm.value.description,
      entityUuid: this.store.value.currentEntity.uuid
    }
    
    if (this.serviceToUpdate) {
      this.onUpdate(serviceInput);
    } else {
      this.onCreate(serviceInput);
    }
  }
  
  onCreate(createInput: any): void {
    this.serviceService.create(createInput)
      .subscribe({
        next: (serviceCreated) => {
          this.isSubmitted = false;
          this.toastrService.success(null, this.translate.instant('service.creation-succeed'))
          this.dialogRef.close(serviceCreated);
        },
        error: (error) => {
          this.isSubmitted = false;
          if (error.error.statusCode === 400) {
            this.toastrService.danger(null, this.translate.instant('service.creation-failed-already-exist'));
          } else {
            this.toastrService.danger(null, this.translate.instant('service.creation-failed'));
          }
        }
      })
  }
  
  onUpdate(updateInput: any): void {
    delete updateInput.entityUuid;
    this.serviceService.update(this.serviceToUpdate.uuid, updateInput)
      .subscribe({
        next: (serviceUpdated) => {
          this.isSubmitted = false;
          this.toastrService.success(null, this.translate.instant('service.update-succeed'));
          this.dialogRef.close(serviceUpdated);
        },
        error: (error) => {
          this.isSubmitted = false;
          this.toastrService.danger(null, this.translate.instant('service.update-failed'));
        }
      })
  }
}
