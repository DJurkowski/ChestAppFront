import { Message } from 'src/app/room/message';
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
  usernameId: string;

  form: any = {};
  isEdited = false;
  isEditedFailed = false;
  errorMessage: string;

  public isDisabled = true;

  constructor(private userService: UserService, private token: TokenStorageService) {

   }

  ngOnInit() {
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
  }

  disabledFunction() {
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

}
