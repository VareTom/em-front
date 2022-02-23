import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Store } from 'src/store';

// Services
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from 'src/shared/services/service.service';

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
  isSubmitted: boolean = false;
  
  constructor(protected dialogRef: NbDialogRef<CreateServiceDialogComponent>,
              private store: Store,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private readonly serviceService: ServiceService,
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
    this.isSubmitted = true;
    const serviceInput = {
      name: this.serviceForm.value.name,
      priceInCent: this.serviceForm.value.priceInCent * 100,
      code: this.serviceForm.value.code,
      description: this.serviceForm.value.description,
      entityUuid: this.store.value.currentEntity.uuid
    }
    this.serviceService.create(serviceInput)
      .subscribe({
        next: (serviceCreated) => {
          this.isSubmitted = false;
          this.dialogRef.close(serviceCreated);
          this.toastrService.success(this.translate.instant('service.creation-succeed'))
        },
        error: (error) => {
          this.isSubmitted = false;
          if (error.error.statusCode === 400) {
            this.toastrService.warning(this.translate.instant('service.creation-failed-already-exist'), this.translate.instant('errors.title'))
          } else {
            this.toastrService.danger(this.translate.instant('service.creation-failed'), this.translate.instant('errors.title'))
          }
        }
      })
  }
}
