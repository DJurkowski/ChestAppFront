import { Match } from './../../match/match';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchService } from 'src/app/services/match.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { WebSocketService } from 'src/app/globalService/web-socket.service';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { t } from '@angular/core/src/render3';
import { User } from 'src/app/user/user';
import { FigureErrorDialogComponent } from 'src/app/chess/figure-error-dialog/figure-error-dialog.component';

@Component({
  selector: 'app-quick-game-list',
  templateUrl: './quick-game-list.component.html',
  styleUrls: ['./quick-game-list.component.css']
})
export class QuickGameListComponent implements OnInit {

  isShowed = true;
  noMatches = true;
  endGame = '';

  username: string;
  userId: number;
  private userIdentification: Observable<Object>;

  matches: Observable<Match[]>;
  matchList: Array<Match> = new Array<Match>();
  matchWaitList: Array<Match> = new Array<Match>();

  constructor(private matchService: MatchService, private token: TokenStorageService,
    private userService: UserService, private webSocketService: WebSocketService, public dialog: MatDialog ) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.userIdentification = this.userService.getUserId(this.username);
    this.userIdentification.subscribe(data => {
      this.userId = Number(data);
      console.log('User Identification' + this.userId);
    });

    this.initializeWebSocketConnection();
    this.reloadData();
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

    this.webSocketService.globalStartQuickGameUpdate.subscribe((data) => {
      const messageTab = data.split(';', 5);
      if (messageTab[0] === 'startQuickGame') {
        if (messageTab[4] === 'true') {
          console.log('Jestem halo!!!!!!GRA TERAZ');
          this.startGame(messageTab[1]);
        }
      }
    });
  }

  reloadData() {
    this.matchList = [];
    this.matchWaitList = [];
    this.matches = this.matchService.getQuickGames(this.username);

    this.matches.forEach(data => {
      data.forEach( zdata => {

          if ((zdata.userOneReady === true && zdata.userTwoReady !== true)
          || (zdata.userOneReady !== true && zdata.userTwoReady === true)) {
            this.matchWaitList.push(zdata);
          } else {
            this.matchList.push(zdata);
          }

        if (this.matchList.length === 0 && this.matchWaitList.length === 0) {
          this.noMatches = true;
        } else {
          this.noMatches = false;
        }
      });
    });
  }

  ready(match: Match) {
    if (this.userId !== match.userOneId) {
      console.log('Wysylam zaproszenie 1Ready');
      this.webSocketService.sendMessage('ready', match.name, this.username, match.userOneId, 'true');
      setTimeout(() => {
      console.log('Wysylam zaproszenie 2Notyfikacje');
      this.webSocketService.sendMessage('noti', match.name, this.username , match.userOneId, this.username
      + ' is waiting for your joining to quick game (game name: ' + match.name + ')');
      // this.reloadData();
      }, 2000);
      this.reloadData();
    }
  }

  playGame(match: Match) {
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
                  this.matchService.modifyQuickGame(i.id, this.username, i).subscribe(
                    dataV => {
                      console.log(i.name);
                      dataV = i;
                    },
                    error => {
                      console.log(error);
                    }
                  );
                  if (this.userId !== match.userOneId) {
                    this.webSocketService.sendMessage('startQuickGame', i.name, this.username, i.userOneId, 'true');
                  } else {
                    this.webSocketService.sendMessage('startQuickGame', i.name, this.username, i.userTwoId, 'true');
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
                  this.reloadData();
                }
            });

        }
      }
    }
  }

  denyGame(match: Match) {
    this.webSocketService.sendMessage('ready', match.name, this.username, match.userTwoId, 'false');
    this.reloadData();
    setTimeout(() => {
    console.log('Odrzucam Notyfikacje!!!!');
    this.webSocketService.sendMessage('noti', match.name, this.username , match.userTwoId, this.username
    + ' deny your invitation ' + match.name);
    }, 2000);
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

  endGameValue(event: Match) {
    if (event.status === 'FINISHED' ) {
      for (const i of this.matchWaitList) {
        if (i.id === event.id) {
          i.showMatch = false;
          i.status = 'FINISHED';
          if (event.whoWon !== 0) {
            i.whoWon = event.whoWon;
          }
          this.matchService.modifyQuickGame(i.id, this.username, event).subscribe(
            data => {
              console.log('Wysylam Modyfikacje Match User: ' + this.username);
              data = event;
            },
            error => {
              console.log(error);
            }
          );
          this.userService.userAvailable(this.username, 'true').subscribe(
            data => {
              console.log('Wysylam User available !!!' + data);
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
