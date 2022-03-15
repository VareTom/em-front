import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Store } from 'src/store';

// Services
import { EntityService } from 'src/shared/services/entity.service';

@Component({
  selector: 'app-invite-member-dialog',
  templateUrl: './invite-member-dialog.component.html',
  styleUrls: ['./invite-member-dialog.component.scss']
})
export class InviteMemberDialogComponent implements OnInit {
  
  memberForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })
  isSubmitted: boolean = false;
  submitButtonText: string = this.translate.instant('actions.invite');
  
  constructor(protected dialogRef: NbDialogRef<InviteMemberDialogComponent>,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private readonly entityService: EntityService,
              private store: Store,
              private formBuilder: FormBuilder) { }
  
  ngOnInit(): void { }
  
  get isEmailRequiredInput(): boolean {
    const formControl = this.memberForm.get('email');
    return formControl.touched && formControl.getError('required');
  }
  
  get isEmailInvalidInput(): boolean {
    const formControl = this.memberForm.get('email');
    return formControl.touched && formControl.getError('email');
  }
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    this.isSubmitted = true;
    
    this.entityService.invite(this.memberForm.value)
      .subscribe({
        next: (memberCreated) => {
          this.isSubmitted = false;
          this.toastrService.success(null, this.translate.instant('entity.invitation-succeed'));
          this.dialogRef.close(memberCreated);
        },
        error: (error) => {
          this.isSubmitted = false;
          if (error.error.statusCode === 400) {
            this.toastrService.danger(null, this.translate.instant('errors.email-already-used'));
          } else {
            this.toastrService.danger(null, this.translate.instant('entity.invitation-failed'));
          }
        }
      })
  }

}
