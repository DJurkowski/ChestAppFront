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
