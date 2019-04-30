import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userProfil: User;
  form: string;
  errorMessage: string;
  username: string;

  public isDisabled = true;

  constructor(private userService: UserService, private token: TokenStorageService) {
    this.username = this.token.getUsername();
   }

  ngOnInit() {
    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.board = data;
    //   },
    //   error => {
    //     this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
    //   }
    // );
    this.userService.getUserProfil(this.username).subscribe(
      data => {
        this.userProfil = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  disabledFunction() {
    this.isDisabled = !this.isDisabled;
  }

}
