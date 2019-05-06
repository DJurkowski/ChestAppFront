import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']
})
export class KingComponent implements OnInit {

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
