import { Observable } from 'rxjs';
import { Tournament } from './../tournament';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tournament-userlist',
  templateUrl: './tournament-userlist.component.html',
  styleUrls: ['./tournament-userlist.component.css']
})
export class TournamentUserlistComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  username: string;

  constructor(private tournamentService: TournamentService, private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.tournaments = this.tournamentService.getUserTournaments(this.username);
  }

}
