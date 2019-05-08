import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-user-friend-details',
  templateUrl: './user-friend-details.component.html',
  styleUrls: ['./user-friend-details.component.css']
})
export class UserFriendDetailsComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
