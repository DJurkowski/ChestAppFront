import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class KnightComponent implements OnInit {

  @Input() check: boolean;
  @Input() neg: boolean;

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

  constructor() { }

  ngOnInit() {
  }

}
