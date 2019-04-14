import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GameService } from '../game.service';

export interface DialogVariable {
  dialogVariable: string;
}

@Component({
  selector: 'app-opponent-dialog',
  templateUrl: './opponent-dialog.component.html',
  styleUrls: ['./opponent-dialog.component.css']
})
export class OpponentDialogComponent {

  dialogData: string;

  constructor(public dialogRef: MatDialogRef<OpponentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogVariable,
  public game: GameService) {
    this.dialogData = data.dialogVariable;
    this.initializeCloseVariable();
  }

  initializeCloseVariable() {

    this.game.userTurnUpdate.subscribe((data) => {
      if (data.valueOf() === true) {
        this.dialogRef.close();
      }
    });
    if (this.dialogData === 'false') {
      this.dialogRef.close();
      return;
    }
  }




}
