import { TokenStorageService } from './../../auth/token-storage.service';
import { TournamentService } from './../../services/tournament.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  username: string;
  isJoin = false;
  isJoinFailed = false;
  errorMessage = '';

  constructor(private tournamentService: TournamentService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.tournaments = this.tournamentService.getTournaments(this.username);
  }

  addUserToTournament(tournamentId: number) {
    this.tournamentService.addUserToTournament(tournamentId, this.username)
    .subscribe(
      data => {
        console.log(data);
          this.isJoin = true;
          this.isJoinFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isJoinFailed = true;
      });
  }

  deleteTournament(tournamentId: number) {
    this.tournamentService.deleteTournament(tournamentId, this.username)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
      );
  }

}
