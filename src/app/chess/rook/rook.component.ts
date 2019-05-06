import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.css']
})
export class RookComponent implements OnInit {

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
