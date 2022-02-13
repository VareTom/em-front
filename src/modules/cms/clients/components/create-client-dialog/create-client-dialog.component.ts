import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.scss']
})
export class CreateClientDialogComponent implements OnInit {
  
  clientForm: FormGroup = this.formBuilder.group({
    client: this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null],
      options: [null]
    }),
    hasAddress: [false],
    address: this.formBuilder.group({
      street: [null],
      number: [null],
      postalCode: [null],
      locality: [null],
      country: [null],
      box: [null],
    })
  })
  
  constructor(protected dialogRef: NbDialogRef<CreateClientDialogComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
