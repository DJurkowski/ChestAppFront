import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent {

  @Input() check: boolean;
  @Input() neg: boolean;

  constructor() { }

  getStyle() {
    return this.check
    ? { border: '8px solid #09f190'}
    : { border: 'none' };
  }

  getNegStyle() {
    if (this.neg ) {
      return {color: 'red'};
    }
  }


}
