import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FriendService } from 'src/app/services/friend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-friend',
  templateUrl: './user-friend.component.html',
  styleUrls: ['./user-friend.component.css']
})
export class UserFriendComponent implements OnInit {

  friends: Observable<User[]>;
  usernameId: string;
  searchText = '';

  isHidden = false;
  isOpened: number;

  constructor(private token: TokenStorageService, private friendService: FriendService, private router: Router) {

   }

  ngOnInit() {
    if (this.token.getToken()) {
      this.usernameId = this.token.getUsername();
    this.reloadData();
    } else {
      this.router.navigate(['home']);
    }
  }

  reloadData() {
    this.friends = this.friendService.getListofFriends(this.usernameId);
  }

  hideDiv(digit: number) {
    this.isHidden = !this.isHidden;
    if (this.isOpened === digit) {
      this.isOpened = 0;
    } else {
      this.isOpened = digit;
    }
  }

}
