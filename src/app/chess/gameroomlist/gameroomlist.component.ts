import { WebSocketService } from 'src/app/globalService/web-socket.service';
import { UserService } from './../../services/user.service';
import { TournamentService } from './../../services/tournament.service';
import { Observable } from 'rxjs';
import { TokenStorageService } from './../../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { Match } from 'src/app/match/match';
import { Tournament } from 'src/app/tournament/tournament';
import { User } from 'src/app/user/user';
import { MatDialog } from '@angular/material';
import { FigureErrorDialogComponent } from '../figure-error-dialog/figure-error-dialog.component';


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
  private userIdentification: Observable<Object>;

  matches: Observable<Match[]>;
  tournaments: Observable<Tournament[]>;
  tournas = new Array<Tournament>();
  matchList: Array<Match> = new Array<Match>();
  matchWaitList: Array<Match> = new Array<Match>();


  constructor(private matchService: MatchService, private tournamentService: TournamentService, private token: TokenStorageService,
    private userService: UserService, private webSocketService: WebSocketService, public dialog: MatDialog) {}

  ngOnInit() {
    this.username = this.token.getUsername();
    this.userIdentification = this.userService.getUserId(this.username);
    this.userIdentification.subscribe(data => {
      this.userId = Number(data);
      console.log('User Identification' + this.userId);
    });
    this.reloadData();
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    this.webSocketService.globalUserReadyUpdate.subscribe((data) => {
      const messageTab = data.split(';', 5);
      if (messageTab[0] === 'ready') {
        if (messageTab[3] === this.username) {
          console.log('Przyjalem Ready!!!!!: ' + messageTab[4] );
          this.reloadData();
        }
      }
    });

    this.webSocketService.globalStartGameUpdate.subscribe((data) => {
      const messageTab = data.split(';', 5);
      if (messageTab[0] === 'startGame') {
        if (messageTab[4] === 'true') {
          this.startGame(messageTab[1]);
        }
      }
    });
  }

  reloadData() {
    this.tournas = [];
    this.matchList = [];
    this.matchWaitList = [];
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
          status: xdata.status,
          matchTime: xdata.matchTime
        });
      });
      for (const i of this.tournas) {
          if (i.status === 'STANDBY') {
            this.matches = this.matchService.getMetches(i.id, this.username);
            this.matches.forEach(ydata => {
              ydata.forEach( zdata => {
                if (!((zdata.status === 'FINISHED') || (zdata.status === 'STARTED'))) {
                  // tslint:disable-next-line:max-line-length
                  if ((zdata.userOneReady === true && zdata.userTwoReady !== true) || (zdata.userOneReady !== true && zdata.userTwoReady === true)) {
                    this.matchWaitList.push(zdata);
                  } else {
                    this.matchList.push(zdata);
                  }
                }
                if (this.matchList.length === 0 && this.matchWaitList.length === 0) {
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

  startGame(matchName: string) {
    if (this.isShowed !== false) {
      for (const i of this.matchWaitList) {
        if (i.status === 'STANDBY') {
          if ( matchName === i.name) {
            if (i.userOneId === this.userId && i.userTwoReady === true) {
                i.userOneReady = true;
            } else if (i.userTwoId === this.userId && i.userOneReady === true) {
                i.userTwoReady = true;
            }
              i.status = 'STARTED';
              i.showMatch = true;
              this.isShowed = false;
          }
        }
      }
    }
  }

  acceptGame(match: Match) {
    for (const i of this.matchWaitList) {
      if (i.status === 'STANDBY') {
        if ( match.id === i.id) {
          let userObservable: Observable<User>;
          let user: User;
          if (i.userOneId === this.userId) {
            userObservable = this.userService.getUser(i.userTwoId);
          } else if (i.userTwoId === this.userId) {
            userObservable = this.userService.getUser(i.userOneId);
          }
            userObservable.subscribe(data => {
              user = data;
              console.log('Jestem w subscribeUser Available : !!!!' + user.available);

              if (user.available) {
                if (i.userOneId === this.userId && i.userTwoReady === true) {
                    i.userOneReady = true;
                } else if (i.userTwoId === this.userId && i.userOneReady === true) {
                    i.userTwoReady = true;
                }
                  i.status = 'STARTED';
                  console.log('Zapisuje startGameUser!!!!!');
                  i.startGameUser = this.userId;
                  i.showMatch = true;
                  this.matchService.modifyMatch(i.id, this.username, i).subscribe(
                    dataV => {
                      console.log(i.name);
                      dataV = i;
                    },
                    error => {
                      console.log(error);
                    }
                  );
                  if (this.userId !== match.userOneId) {
                    this.webSocketService.sendMessage('startGame', i.name, this.username, i.userOneId, 'true');
                  } else {
                    this.webSocketService.sendMessage('startGame', i.name, this.username, i.userTwoId, 'true');
                  }

                  this.isShowed = false;
                } else {
                  // open dialog uzytkownik unavailable
                  this.openDialog();
                  if (this.userId !== match.userOneId) {
                  this.webSocketService.sendMessage('ready', match.name, this.username, match.userOneId, 'false');
                  } else {
                    this.webSocketService.sendMessage('ready', match.name, this.username, match.userTwoId, 'false');
                  }
                }
            });

        }
      }
    }
  }

  denyGame(match: Match) {
    // odrzucamy zaproszenie
    if (this.userId !== match.userOneId) {
      console.log('Odrzucam Ready!!!!');
      this.webSocketService.sendMessage('ready', match.name, this.username, match.userOneId, 'false');

      setTimeout(() => {
      console.log('Odrzucam Notyfikacje!!!!');
        this.webSocketService.sendMessage('noti', match.name, this.username , match.userOneId, this.username + ' deny your invitation');
      }, 2000);
    } else {
      console.log('Odrzucam Ready!!!!');
      this.webSocketService.sendMessage('ready', match.name, this.username, match.userTwoId, 'false');
      setTimeout(() => {
      console.log('Odrzucam Notyfikacje!!!!');
      this.webSocketService.sendMessage('noti', match.name, this.username , match.userTwoId, this.username + ' deny your invitation');
      }, 2000);
    }
    this.reloadData();
  }

  sendInvitation(match: Match) {
    if (this.userId !== match.userOneId) {
      console.log('Wysylam zaproszenie 1Ready');
      this.webSocketService.sendMessage('ready', match.name, this.username, match.userOneId, 'true');

      setTimeout(() => {
      console.log('Wysylam zaproszenie 2Notyfikacje');
      // tslint:disable-next-line:max-line-length
      this.webSocketService.sendMessage('noti', match.name, this.username , match.userOneId, this.username + ' is waiting for your joining to match');
      }, 2000);
    } else {
      console.log('Wysylam zaproszenie 1Ready');
      this.webSocketService.sendMessage('ready', match.name, this.username, match.userTwoId, 'true');
      setTimeout(() => {
      console.log('Wysylam zaproszenie 2Notyfikacje');
      // tslint:disable-next-line:max-line-length
      this.webSocketService.sendMessage('noti', match.name, this.username , match.userTwoId, this.username + ' is waiting for your joining to match');
      }, 2000);
    }
    this.reloadData();

  }

  endGameValue(event: Match) {
    if (event.status === 'FINISHED' && event.whoWon !== 0) {
      for (const i of this.matchWaitList) {
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
    this.reloadData();
    // dopisac logike do tego jak sie skonczy rozgrywka
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FigureErrorDialogComponent, {
      data: { nameFigure: 'Unavailable' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
