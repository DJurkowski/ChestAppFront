import { TournamentService } from './../../services/tournament.service';
import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../tournament';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'app-tournamnet-details',
  templateUrl: './tournamnet-details.component.html',
  styleUrls: ['./tournamnet-details.component.css']
})
export class TournamnetDetailsComponent implements OnInit {

  @Input() tournament: Tournament;

  username: string;
  isJoin = false;
  isJoinFailed = false;
  errorMessage = '';


  constructor(private tournamentService: TournamentService, private listComponent: TournamentListComponent,
    private token: TokenStorageService) {}

  ngOnInit() {
    this.username = this.token.getUsername();
  }

  addUsertoTournament() {
    this.tournamentService.addUserToTournament(this.tournament.id, this.username)
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
        }
      );
  }

  deleteTournament() {
    this.tournamentService.deleteTournament(this.tournament.id, this.username)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error)
      );
  }

}
