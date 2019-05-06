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
    ? { color: '#5cb85c'}
    : { color: 'unset' };
  }

  getNegStyle() {
    if (this.neg ) {
      return {color: 'red'};
    }
  }

  ngOnInit() {
  }

}
