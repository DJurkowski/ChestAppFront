import { TokenStorageService } from './../../auth/token-storage.service';
import { UserService } from './../../services/user.service';
import { Observable } from 'rxjs';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;
  userList: Array<User> = new Array<User>();
  usernameId: string;
  searchText = '';
  aa = false;
  constructor(private userService: UserService, private token: TokenStorageService ) { }

  ngOnInit() {
    this.usernameId = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUsers();
    this.users.forEach(data => {
      data.forEach(xdata => {
        this.userList.push(xdata);
      });
    });
  }

  setIndex(ii) {
    this.aa = ii;
  }

}
