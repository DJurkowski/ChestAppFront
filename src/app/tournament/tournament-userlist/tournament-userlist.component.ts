import { Observable } from 'rxjs';
import { Tournament } from './../tournament';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { TournamentService } from '../../services/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-userlist',
  templateUrl: './tournament-userlist.component.html',
  styleUrls: ['./tournament-userlist.component.css']
})
export class TournamentUserlistComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  username: string;
  isEmpty = false;
  searchText = '';

  constructor(private tournamentService: TournamentService, private token: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.username = this.token.getUsername();
      this.reloadData();
    } else {
      this.router.navigate(['home']);
    }

  }

  reloadData() {
    this.isEmpty = false;
    this.tournaments = this.tournamentService.getUserTournaments(this.username);

  }

}
