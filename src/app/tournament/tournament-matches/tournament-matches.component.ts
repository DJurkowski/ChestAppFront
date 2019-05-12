import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { Tournament } from '../tournament';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tournament-matches',
  templateUrl: './tournament-matches.component.html',
  styleUrls: ['./tournament-matches.component.css']
})
export class TournamentMatchesComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  username: string;

  isHidden = false;
  isOpened: number;

  constructor(private tournamentService: TournamentService, private token: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.username = this.token.getUsername();
    this.reloadData();
    } else {
      this.router.navigate(['home']);
    }
  }

  reloadData() {
    this.tournaments = this.tournamentService.getAllTournaments(this.username);
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
