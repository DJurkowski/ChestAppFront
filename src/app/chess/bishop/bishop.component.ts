import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.css']
})
export class BishopComponent implements OnInit {

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

  ngOnInit() {
  }

}
