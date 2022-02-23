import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-deletion-dialog',
  templateUrl: './confirmation-deletion-dialog.component.html',
  styleUrls: ['./confirmation-deletion-dialog.component.scss']
})
export class ConfirmationDeletionDialogComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<ConfirmationDeletionDialogComponent>) { }

  ngOnInit(): void {
  }
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  onValidate(): void {
    this.dialogRef.close(true);
  }
}
