import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class KnightComponent implements OnInit {

  @Input() check: boolean;


  getStyle() {
    return this.check
    ? { border: '8px solid #09f190'}
    : { border: 'none' };
  }

  constructor() { }

  ngOnInit() {
  }

}
