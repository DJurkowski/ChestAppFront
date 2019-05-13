import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { Match } from 'src/app/match/match';

@Component({
  selector: 'app-all-quick-games',
  templateUrl: './all-quick-games.component.html',
  styleUrls: ['./all-quick-games.component.css']
})
export class AllQuickGamesComponent implements OnInit {

  matches: Observable<Match[]>;

  username: string;
  isHidden = false;
  isOpened: number;
  searchText = '';

  constructor(private matchService: MatchService, private token: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.username = this.token.getUsername();
    this.reloadData();
    } else {
      this.router.navigate(['home']);
    }
  }

  reloadData() {
    this.matches = this.matchService.getAllQuickGames(this.username);
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
