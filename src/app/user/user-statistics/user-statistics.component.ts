import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  username: string;
  userId: number;
  userIdentification: Observable<Object>;
  userProfil: User;

  constructor(private userService: UserService, private token: TokenStorageService, private router: Router ) {
    this.username = this.token.getUsername();
  }

  ngOnInit() {
    this.userProfil = {
      id: 0,
      username: '',
      email: '',
      rankValue: 0,
      wins: 0,
      losses: 0,
      movesSum: 0,
      roundTime: 0,
      joined: '',
      available: true
      };
    if (this.token.getToken()) {
    this.reloadData();
    } else {
      this.router.navigate(['home']);
    }
  }

  reloadData() {
    this.userService.getUserProfil(this.username).subscribe(
      data => {
        this.userProfil = data;
      }
    );
  }

}
