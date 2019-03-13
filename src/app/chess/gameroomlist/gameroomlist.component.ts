import { WebSocketService } from 'src/app/globalService/web-socket.service';
import { UserService } from './../../services/user.service';
import { TournamentService } from './../../services/tournament.service';
import { Observable } from 'rxjs';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Match } from 'src/app/match/match';
import { Tournament } from 'src/app/tournament/tournament';
import { Stomp} from 'stompjs/lib/stomp.js';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-gameroomlist',
  templateUrl: './gameroomlist.component.html',
  styleUrls: ['./gameroomlist.component.css']
})
export class GameroomlistComponent implements OnInit {

  isShowed = true;
  noMatches = true;
  endGame = '';

  username: string;
  userId: number;
  userIdentification: Observable<Object>;

  private stompClient = null;
  private serverUrl = 'http://localhost:8080/api/auth/socket';

  matches: Observable<Match[]>;
  tournaments: Observable<Tournament[]>;
  tournas = new Array<Tournament>();
  matchList: Array<Match> = new Array<Match>();

  constructor(private matchService: MatchService, private tournamentService: TournamentService, private token: TokenStorageService,
    private userService: UserService, private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.username = this.token.getUsername();
    this.userIdentification = this.userService.getUserId(this.username);
    this.userIdentification.subscribe(data => {
      this.userId = Number(data);
      console.log('User Identification' + this.userId);
    });
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
          } else {
            this.noMatches = true;
          }
        }
    });
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

  sendMessageToOpponent(match: Match) {
    // const ws = new SockJS(this.serverUrl);
    // this.stompClient = Stomp.over(ws);
    // const that = this;
    // this.stompClient.connect({}, function(frame) {
    //   if (that.userId === match.userOneId) {
    //     console.log('Wysylam kurwa do ' + match.userTwoId);
    //     that.stompClient.send('/api/notifi/' + match.userTwoId, {}, 'notifi');
    //   } else {
    //     console.log('Wysylam kurwa do ' + match.userTwoId);
    //     that.stompClient.send('/api/notifi/' + match.userOneId, {}, 'notifi');
    //   }
    //   });
    //   console.log('StompJestem1');
    //   if (this.stompClient !== null) {
    //   console.log('StompJestem2');
    //     this.stompClient.disconnect();
    //   }
    //   console.log('StompJestem3');
    if (this.userId !== match.userOneId) {
      // tslint:disable-next-line:max-line-length
      this.webSocketService.sendMessage('noti', match.name, this.username , match.userOneId, this.username + ' is waiting for your joining to match');
    } else {
      // tslint:disable-next-line:max-line-length
      this.webSocketService.sendMessage('noti', match.name, this.username , match.userTwoId, this.username + ' is waiting for your joining to match');
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
