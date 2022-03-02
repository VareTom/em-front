import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'src/store';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    message: [null, [Validators.required, Validators.maxLength(2)]],
    object: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,
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
  
  get isObjectRequiredInput(): boolean {
    const formControl = this.contactForm.get('object');
    return formControl.touched && formControl.getError('required');
  }
  
  onSubmit(): void {
    // TODO:: send mail to own box
  }
}
