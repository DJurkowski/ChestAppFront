import { TournamentService } from './../../services/tournament.service';
import { Observable } from 'rxjs';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { GameRoom } from '../gameRoom';
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
  endGame = '';

  username: string;
  matches: Observable<Match[]>;
  tournaments: Observable<Tournament[]>;
  tournas = new Array<Tournament>();
  matchList: Array<Match> = new Array<Match>();

  // lista: GameRoom[] = [
  //   {
  //     id: 1,
  //     name: 'room1',
  //     userOneId: '1',
  //     userTwoId: '2',
  //     status: 'notStarted',
  //     show: false,
  //     whoWon: null
  //   },
  //   {
  //     id: 2,
  //     name: 'room2',
  //     userOneId: '1',
  //     userTwoId: '2',
  //     status: 'notStarted',
  //     show: false,
  //     whoWon: null
  //   },
  //   {
  //     id: 3,
  //     name: 'room3',
  //     userOneId: '1',
  //     userTwoId: '2',
  //     status: 'notStarted',
  //     show: false,
  //     whoWon: null
  //   }
  // ];

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
                this.matchList.push(zdata);
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
            console.log('Jestem!!!!');
            // dodac update na server z tymi danymi -- update
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
    // this.isShowed = false;
    // wjebac do appboard jakas zeminna Match, moze jeszcze id po to aby to porem usunac
    // $('#' + match.id).remove();
  }

  endGameValue(event: Match) {
    this.endGame = event.status;
    if (this.endGame === 'STARTED' ) {
      for (const i of this.matchList) {
        if (i.id === event.id) {
          i.showMatch = false;
          i.status = 'FINISHED';
          i.whoWon = event.whoWon;
          // dodac upload na server -- upload
          this.matchService.modifyMatch(i.id, this.username, i);
          this.isShowed = true;
        }
      }
    }
    this.tournaments = null;
    this.tournas = null;
    this.matches = null;
    this.matchList = null;
    this.reloadData();
    // dopisac logike do tego jak sie skonczy rozgrywka
  }

}
