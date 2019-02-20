import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']
})
export class PawnComponent implements OnInit {

  @Input() check: boolean;
  @Input() neg: boolean;

  constructor() { }

  getStyle() {
    return this.check
    ? { border: '8px solid #09f190'}
    : { border: 'none' };
  }

  getNegStyle() {
    if (this.neg && this.check) {
      return {backgroundColor: '#ff3f3f', border: '8px solid #09f190' };
    } else {
      return { backgroundColor: '#ff3f3f' };
    }
  }

  ngOnInit() {
  }


}
