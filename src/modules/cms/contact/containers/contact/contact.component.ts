import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';

// Services
import { ContactService } from 'src/shared/services/contact.service';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isSubmitted: boolean = false;
  contactForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    message: [null, [Validators.required, Validators.maxLength(255)]],
    subject: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
              private readonly contactService: ContactService,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              private store: Store) { }

  ngOnInit(): void {
    this.contactForm.patchValue({email: this.store.value.connectedUser.email});
  }
  
  get isEmailRequiredInput(): boolean {
    const formControl = this.contactForm.get('email');
    return formControl.touched && formControl.getError('required');
  }
  
  get isEmailInvalidInput(): boolean {
    const formControl = this.contactForm.get('email');
    return formControl.touched && formControl.getError('email');
  }
  
  get isMessageRequiredInput(): boolean {
    const formControl = this.contactForm.get('message');
    return formControl.touched && formControl.getError('required');
  }
  
  get isMessageInvalidInput(): boolean {
    const formControl = this.contactForm.get('message');
    return formControl.touched && formControl.getError('maxlength');
  }
  
  get isSubjectRequiredInput(): boolean {
    const formControl = this.contactForm.get('subject');
    return formControl.touched && formControl.getError('required');
  }
  
  onSubmit(): void {
    this.isSubmitted = true;
    this.contactService.contact(this.contactForm.value)
      .subscribe({
        next: () => {
          this.isSubmitted = false;
          this.toastrService.success(this.translate.instant('contact.confirm-sended-text'), this.translate.instant('contact.confirm-sended-title'));
        },
        error: () => {
          this.isSubmitted = false;
          this.toastrService.danger(null, this.translate.instant('contact.send-failed'));
        }
      })
  }
}
