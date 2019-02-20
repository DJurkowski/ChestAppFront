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

  lista: GameRoom[] = [
    {
      id: 1,
      name: 'room1',
      userOneId: '1',
      userTwoId: '2',
      status: 'notStarted',
      show: false,
      whoWon: null
    },
    {
      id: 2,
      name: 'room2',
      userOneId: '1',
      userTwoId: '2',
      status: 'notStarted',
      show: false,
      whoWon: null
    },
    {
      id: 3,
      name: 'room3',
      userOneId: '1',
      userTwoId: '2',
      status: 'notStarted',
      show: false,
      whoWon: null
    }
  ];

  constructor(private matchService: MatchService, private tournamentService: TournamentService, private token: TokenStorageService) {}

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.tournaments = this.tournamentService.getUserTournaments(this.username);
    this.tournaments.forEach(data => {
      data.forEach( xdata => {
        this.tournas.push( {
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
    });

    // dodac if z tym czy status tournament = STANDBY jak tak to pobieramy mecze jak nie to nie pobieramy! GENIUS

    // this.matches = this.matchService.getMetches(this.tournamentId, this.username);
  }

  playGame(gameroom: GameRoom) {

    for (const i of this.lista) {
      if (i.status === 'notStarted') {
        if ( gameroom.id === i.id) {
            i.status = 'started';
            i.show = true;
        }
      }
    }
    this.isShowed = false;
    // wjebac do appboard jakas zeminna GameRoom, moze jeszcze id po to aby to porem usunac
    // $('#' + gameroom.id).remove();
  }

  endGameValue(event: GameRoom) {
    this.endGame = event.status;
    if (this.endGame === 'finished' ) {
      for (const i of this.lista) {
        if (i.show === true && i.status === 'finished') {
          i.show = false;
          i.status = 'finished';
          this.isShowed = true;
        }
      }
    }
    // dopisac logike do tego jak sie skonczy rozgrywka
  }

}
