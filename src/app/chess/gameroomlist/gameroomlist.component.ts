import { TournamentService } from './../../services/tournament.service';
import { Observable } from 'rxjs';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Component, OnInit, Input } from '@angular/core';
// import { GameRoom } from '../gameRoom';
import { MatchService } from 'src/app/services/match.service';
import { Match } from 'src/app/match/match';
import { Tournament } from 'src/app/tournament/tournament';

@Component({
  selector: 'app-gameroomlist',
  templateUrl: './gameroomlist.component.html',
  styleUrls: ['./gameroomlist.component.css']
})
export class GameroomlistComponent implements OnInit {

  isShowed = true;
  noMatches = false;
  endGame = '';

  username: string;
  matches: Observable<Match[]>;
  tournaments: Observable<Tournament[]>;
  tournas = new Array<Tournament>();
  matchList: Array<Match> = new Array<Match>();

  constructor(private matchService: MatchService, private tournamentService: TournamentService, private token: TokenStorageService) {}

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    // czyscic te wartosci ??? tournamnets i tournas i matches i matchList
    this.tournaments = this.tournamentService.getUserTournaments(this.username);

    this.tournaments.forEach(data => {
      data.forEach( xdata => {
        this.tournas.push({
          id: xdata.id,
          description: xdata.description,
          masterUser: xdata.masterUser,
          maxNumberOfUser: xdata.maxNumberOfUser,
          minValueOfRankValue: xdata.minValueOfRankValue,
          name: xdata.name,
          numberOfUser: xdata.masterUser,
          status: xdata.status
        });
      });
      for (const i of this.tournas) {
          if (i.status === 'STANDBY') {
            this.matches = this.matchService.getMetches(i.id, this.username);
            this.matches.forEach(ydata => {
              ydata.forEach( zdata => {
                if (!((zdata.status === 'FINISHED') || (zdata.status === 'STARTED'))) {
                  this.matchList.push(zdata);
                }
                if (this.matchList.length === 0) {
                  this.noMatches = true;
                } else {
                  this.noMatches = false;
                }
              });
            });
          }
        }
    });

    // dodac if z tym czy status tournament = STANDBY jak tak to pobieramy mecze jak nie to nie pobieramy! GENIUS
  }

  playGame(match: Match) {

    for (const i of this.matchList) {
      if (i.status === 'STANDBY') {
        if ( match.id === i.id) {
            i.status = 'STARTED';
            i.showMatch = true;
            this.matchService.modifyMatch(i.id, this.username, i).subscribe(
              data => {
                console.log(i.name);
                data = i;
              },
              error => {
                console.log(error);
              }
            );
            this.isShowed = false;
        }
      }
    }
  }

  endGameValue(event: Match) {
    if (event.status === 'FINISHED' ) {
      for (const i of this.matchList) {
        if (i.id === event.id) {
          i.showMatch = false;
          i.status = 'FINISHED';
          i.whoWon = event.whoWon;
          // dodac upload na server -- upload
          this.matchService.modifyMatch(i.id, this.username, i).subscribe(
            data => {
              data = i;
            },
            error => {
              console.log(error);
            }
          );
          this.isShowed = true;
        }
      }
    }
    // this.tournaments = null;
    this.tournas = [];
    // this.matches;
    this.matchList = [];
    this.reloadData();
    // dopisac logike do tego jak sie skonczy rozgrywka
  }

}