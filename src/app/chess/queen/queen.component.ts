import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.css']
})
export class QueenComponent implements OnInit {

  @Input() check: boolean;
  @Input() neg: boolean;

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

  constructor() { }

  ngOnInit() {
  }

}
