import { TournamentService } from './../../services/tournament.service';
import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../tournament';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tournament-edit-list',
  templateUrl: './tournament-edit-list.component.html',
  styleUrls: ['./tournament-edit-list.component.css']
})
export class TournamentEditListComponent implements OnInit {

  tournaments: Observable<Tournament[]>;

  username: string;
  isHidden = false;
  isOpened: number;


  constructor(private tournamentService: TournamentService, private token: TokenStorageService, private router: Router) {}

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
