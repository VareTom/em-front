import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-validation-dialog',
  templateUrl: './confirmation-validation-dialog.component.html',
  styleUrls: ['./confirmation-validation-dialog.component.scss']
})
export class ConfirmationValidationDialogComponent implements OnInit {
  
  constructor(protected dialogRef: NbDialogRef<ConfirmationValidationDialogComponent>) { }
  
  ngOnInit(): void {
  }
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
