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
  username: string;
  constructor(private userService: UserService, private token: TokenStorageService ) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUsers();
  }

}
