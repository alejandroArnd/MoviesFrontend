import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  message: string = ""
  closeButtonText = "Close"
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<DialogComponent>) { 
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.closeButtonText = data.buttonText.close || this.closeButtonText;
      }
    }
  }

  ngOnInit(): void {
  }

}
