import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogError {
  nameFigure: string;
}

@Component({
  selector: 'app-figure-error-dialog',
  templateUrl: './figure-error-dialog.component.html',
  styleUrls: ['./figure-error-dialog.component.css']
})
export class FigureErrorDialogComponent implements OnInit {

  name: string;
  constructor(public dialogRef: MatDialogRef<FigureErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogError) {
      this.name = data.nameFigure;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
