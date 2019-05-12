import { MatchService } from './../../services/match.service';
import { MatchInfo } from './../../match/match-info';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quick-game',
  templateUrl: './create-quick-game.component.html',
  styleUrls: ['./create-quick-game.component.css']
})
export class CreateQuickGameComponent implements OnInit {

  form: any = {};
  matchInfo: MatchInfo;
  isCreated = false;
  isCreatedFailed = false;
  errorMessage = '';

  username: string;
  times = [ 1, 5, 10, 15];

  constructor(private token: TokenStorageService, private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.username = this.token.getUsername();
    } else {
      this.router.navigate(['home']);
    }

  }

  onSubmit() {
    console.log(this.form);

    this.matchInfo = new MatchInfo(
      this.form.name,
      this.form.matchTime
    );

    this.matchService.createQuickGame(this.matchInfo, this.username).subscribe(data => {
      console.log(data);
      this.isCreated = true;
      this.isCreatedFailed = false;
    },
    error => {
      console.log(error);
      this.errorMessage = error.error.message;
      this.isCreatedFailed = true;
    });
  }
}
