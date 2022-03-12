import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Store } from 'src/store';

// Services
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent implements OnInit {
  
  memberForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })
  isSubmitted: boolean = false;
  submitButtonText: string = this.translate.instant('actions.invite');
  
  constructor(protected dialogRef: NbDialogRef<InviteUserDialogComponent>,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private readonly userService: UserService,
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
    this.userService.invite(this.memberForm.value)
      .subscribe({
        next: (user) => {
          this.isSubmitted = false;
          this.toastrService.success(null, this.translate.instant('admin.invitation-succeed'));
          this.dialogRef.close(user);
        },
        error: () => {
          this.isSubmitted = false;
          this.toastrService.danger(null, this.translate.instant('admin.invitation-failed'));
        }
      })
  }

}
