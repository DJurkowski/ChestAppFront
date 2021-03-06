import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() black: boolean;


  getStyle() {
    return this.black
      ? { backgroundColor: 'black', color: 'white' }
      : { backgroundColor: 'white', color: 'black' };
  }

  constructor() { }

  ngOnInit() {
  }

}
