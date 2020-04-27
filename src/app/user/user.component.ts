import { Message } from 'src/app/room/message';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from './user';
import { WebSocketService } from '../globalService/web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userProfil: User;
  usernameId: string;

  form: any = {};
  isEdited = false;
  isEditedFailed = false;
  isDeleteFailed = false;
  errorMessage: string;

  public isDisabled = true;

  constructor(private userService: UserService, private token: TokenStorageService, private webSocket: WebSocketService,
    private router: Router) {

   }

  ngOnInit() {
    if (this.token.getToken()) {
      this.isEditedFailed = false;
      this.isDeleteFailed = false;
      this.usernameId = this.token.getUsername();
      this.userService.getUserProfil(this.usernameId).subscribe(
        data => {
          this.userProfil = data;
          this.form = this.userProfil;
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    } else {
      this.router.navigate(['home']);
    }
  }

  disabledFunction() {
    this.isEditedFailed = false;
    this.isDeleteFailed = false;
    this.errorMessage = '';
    this.isDisabled = !this.isDisabled;
  }

  onSubmit() {
      this.userService.userEmail(this.usernameId, this.form.email).subscribe(
        data => {
          console.log(data);
          this.isEdited = true;
          this.isEditedFailed = false;
          this.disabledFunction();
          this.ngOnInit();
        },
        error => {
          this.errorMessage = error.error.message;
          this.isEditedFailed = true;
        }
      );
    }

    deleteUser() {
      this.userService.deleteUser(this.usernameId).subscribe(
        data => {
          this.logout();
        },
        error => {
          this.errorMessage = `${JSON.parse(error.error).message}`;
          this.isDeleteFailed = true;
        }

      );
    }

    logout() {
      this.webSocket.closeConnection();
      this.token.signOut();
      window.location.reload();
    }


}
