import { DialogVariable } from './../opponent-dialog/opponent-dialog.component';
import { WebSocketService } from './../../globalService/web-socket.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { GameService } from '../game.service';
import { MatDialog } from '@angular/material';
import { Coord } from '../coord';
import { FigureErrorDialogComponent } from '../figure-error-dialog/figure-error-dialog.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Match } from 'src/app/match/match';
import { Observable, Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { OpponentDialogComponent } from '../opponent-dialog/opponent-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  @Input() match: Match;
  @Output() matchBack = new EventEmitter<Match>();

  username: string;
  userId: number;
  userIdentification: Observable<Object>;

  userTurn: Boolean;
  userMoves: number;
  userRoundTime: number;

  // public opponent: string;
  public actualUserPoints = this.game.userPointsObservable;

  endGameVariable = this.game.endGameObservable;

  // zegar
  private timer;
  public overallMinutes = 0;
  public overallSeconds = 0;
  public minutes = 0;
  public seconds = 0;
  private subscription: Subscription;

  sixtyFour = new Array(64).fill(0).map((_, i) => i);

  knightPosition$ = this.game.knightPosition$;
  knight2Position$ = this.game.knight2Position$;
  kingPosition$ = this.game.kingPosition$;
  queenPosition$ = this.game.queenPosition$;
  rookPosition$ = this.game.rookPosition$;
  rook2Position$ = this.game.rook2Position$;
  bishopPosition$ = this.game.bishopPosition$;
  bishop2Position$ = this.game.bishop2Position$;

  pawnPosition$ = this.game.pawnPosition$;
  pawn2Position$ = this.game.pawn2Position$;
  pawn3Position$ = this.game.pawn3Position$;
  pawn4Position$ = this.game.pawn4Position$;
  pawn5Position$ = this.game.pawn5Position$;
  pawn6Position$ = this.game.pawn6Position$;
  pawn7Position$ = this.game.pawn7Position$;
  pawn8Position$ = this.game.pawn8Position$;

// Negative
  pawnNPosition$ = this.game.pawnNPosition$;
  pawn2NPosition$ = this.game.pawn2NPosition$;
  pawn3NPosition$ = this.game.pawn3NPosition$;
  pawn4NPosition$ = this.game.pawn4NPosition$;
  pawn5NPosition$ = this.game.pawn5NPosition$;
  pawn6NPosition$ = this.game.pawn6NPosition$;
  pawn7NPosition$ = this.game.pawn7NPosition$;
  pawn8NPosition$ = this.game.pawn8NPosition$;
  kingNPosition$ = this.game.kingNPosition$;
  queenNPosition$ = this.game.queenNPosition$;
  knightNPosition$ = this.game.knightNPosition$;
  knight2NPosition$ = this.game.knight2NPosition$;
  rookNPosition$ = this.game.rookNPosition$;
  rook2NPosition$ = this.game.rook2NPosition$;
  bishopNPosition$ = this.game.bishopNPosition$;
  bishop2NPosition$ = this.game.bishop2NPosition$;

  errorFigure = '';

  figureCoords = {
    id: 'zero',
    position: null,
    isCheck: false
  };

  @HostListener('window:beforeunload', ['$event']) canDeactivate(event: BeforeUnloadEvent): void  {
    console.log('Po odswiezeniu strony!!!!');
    event.returnValue = true;
  }

  constructor(private game: GameService, public dialog: MatDialog, private token: TokenStorageService,
    private userService: UserService, private webSocketService: WebSocketService) {
      console.log('Constructor Jestem!!!!!!!');
    this.username = this.token.getUsername();
    this.userIdentification = this.userService.getUserId(this.username);
    this.userIdentification.subscribe(data => {
      this.userId = Number(data);
      console.log('User Identification' + this.userId);
    });

    this.initializeWebSocketConnection();
    this.userService.userAvailable(this.username, 'false').subscribe();

  }

// timer
  ngOnInit() {
    console.log('ngOnInittttttt Jestem!!!!!!!');


    this.openOppoentMovesDialog('false');
    this.checkStartGame();
    this.webSocketService.updateUserAvailable(true);
  }

  checkStartGame() {
    console.log('Jestem w init(StartGameUser): ' + this.match.startGameUser);
    console.log('Jestem w init(Status): ' + this.match.status);
    this.userMoves = 0;
    this.userRoundTime = 0;

    if (this.match.startGameUser !== this.userId && this.match.startGameUser !== null ) {
      this.startCountTime();
      this.userTurn = true;
      console.log('Odpalam Zegar z ngOnInit!!! i userTurn = true');
      this.game.updateUserTurn(true);
    } else {
      this.userTurn = false;
      console.log('UserTurn = false');
      this.openOppoentMovesDialog('true');
      this.game.updateUserTurn(false);
    }

  }

  startCountTime() {
    this.timer = TimerObservable.create(0, 1000);
    this.subscription = this.timer.subscribe(t => {
      if (t % 60 === 0 && t !== 0) {
        this.minutes += 1;
      } else {
        if (this.minutes !== 0) {
          this.seconds = (t - (this.minutes * 60));
          this.overallSeconds += 1;
        } else {
          this.seconds = t;
          this.overallSeconds += 1;
        }
      }
      if (this.overallSeconds % 60 === 0 && this.overallSeconds !== 0) {
        this.overallMinutes += 1;
        this.overallSeconds = 0;
      }
      if (this.match.matchTime === this.overallMinutes) {
        this.errorFigure = 'TIME';
        this.openDialog();
        this.gameRoomBackValue();
      }
      // console.log('Timer: ' + this.minutes + ' : ' + this.seconds );
    });
  }

  ngOnDestroy() {
    console.log('OnDestroyeStart ....');
    // if (this.userTurn) {
    // console.log('OnDestroyeUserTurn ....');
    // this.subscription.unsubscribe();
    // } else {
    console.log('OnDestroyeUserTurnElse ....');
      this.game.updateUserTurn(true);
      this.subscription.unsubscribe();
    // }
    this.game.resetFiguresPositions();
    this.webSocketService.updateUserAvailable(false);
    this.userService.userAvailable(this.username, 'true').subscribe(
      data => {
        console.log('Wysylam User available BOOAAARD!!!' + data);
      },
      error => {
        console.log(error);
      }
    );
  }

  xy(i): Coord {
    return {
      x: i % 8,
      y: Math.floor(i / 8)
    };
  }

  isBlack({x, y}: Coord) {
    return (x + y) % 2 === 1;
  }

  handleSquareClick(pos: Coord) {
    let result: boolean;
    if (this.figureCoords.id !== 'zero') {
        if (this.figureCoords.id === 'knight') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
           result = this.game.moveKnight(pos);
           this.userMoves += 1;
           console.log('Result czy zbity: ' + result);

          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'knight';
              this.openDialog();
            console.log('NIe prawidlowy ruch Knight');
          }
        } else if (this.figureCoords.id === 'king') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
          result = this.game.moveKing(pos);
          this.userMoves += 1;
          console.log('Result czy zbity: ' + result);
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
          this.figureCoords.id = 'zero';
          this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'king';
              this.openDialog();
             console.log('NIe prawidlowy ruch King');
          }
        } else if (this.figureCoords.id === 'knight2') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.moveKnight2(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
            if (result) {
              if (this.endGameVariable.value) {
                this.endGameBackValue();
              } else {
                this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
              }
             } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
             }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'knight2';
              this.openDialog();
            console.log('NIe prawidlowy ruch Knight2');
          }
        } else if (this.figureCoords.id === 'pawn') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
            if (result) {
              if (this.endGameVariable.value) {
                this.endGameBackValue();
              } else {
                this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
              }
             } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
             }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn');
          }
        } else if (this.figureCoords.id === 'pawn2') {
            if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
             result = this.game.movePawn2(pos);
             this.userMoves += 1;
             console.log('Result czy zbity: ' + result);
             if (result) {
              if (this.endGameVariable.value) {
                this.endGameBackValue();
              } else {
                this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
              }
             } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
             }
              this.figureCoords.id = 'zero';
              this.figureCoords.isCheck = false;
            } else {
                this.errorFigure = 'pawn2';
                this.openDialog();
              console.log('NIe prawidlowy ruch Pawn2');
            }
        } else if (this.figureCoords.id === 'pawn3') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn3(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
          // musimy zwrocic boolean czy mamy zbicie czy nie!!!
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn3';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn3');
          }
        } else if (this.figureCoords.id === 'pawn4') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn4(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
          // musimy zwrocic boolean czy mamy zbicie czy nie!!!
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn4';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn4');
          }
        } else if (this.figureCoords.id === 'pawn5') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn5(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
            if (result) {
              if (this.endGameVariable.value) {
                this.endGameBackValue();
              } else {
                this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
              }
             } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
             }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn5';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn5');
          }
        } else if (this.figureCoords.id === 'pawn6') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn6(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
            if (result) {
              if (this.endGameVariable.value) {
                this.endGameBackValue();
              } else {
                this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
              }
             } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
             }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn6';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn6');
          }
        } else if (this.figureCoords.id === 'pawn7') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn7(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
            if (result) {
              if (this.endGameVariable.value) {
                this.endGameBackValue();
              } else {
                this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
              }
             } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
             }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn7';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn7');
          }
        } else if (this.figureCoords.id === 'pawn8') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.movePawn8(pos);
            this.userMoves += 1;
            console.log('Result czy zbity: ' + result);
          // musimy zwrocic boolean czy mamy zbicie czy nie!!!
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn8';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn8');
          }
        } else if (this.figureCoords.id === 'rook') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.moveRook(pos);
            this.userMoves += 1;

          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'rook';
              this.openDialog();
            console.log('NIe prawidlowy ruch Rook');
          }
        } else if (this.figureCoords.id === 'rook2') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.moveRook2(pos);
            this.userMoves += 1;
            // console.log('Result czy zbity: ' + result);
          // musimy zwrocic boolean czy mamy zbicie czy nie!!!
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'rook2';
              this.openDialog();
            console.log('NIe prawidlowy ruch Rook2');
          }
        } else if (this.figureCoords.id === 'bishop') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.moveBishop(pos);
            this.userMoves += 1;
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'bishop';
              this.openDialog();
            console.log('NIe prawidlowy ruch Bishop');
          }
        } else if (this.figureCoords.id === 'bishop2') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.moveBishop2(pos);
            this.userMoves += 1;
          if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'bishop2';
              this.openDialog();
            console.log('NIe prawidlowy ruch Bishop2');
          }
        } else if (this.figureCoords.id === 'queen') {
          if (this.game.canMoveFigure(pos, this.figureCoords.id)) {
            result = this.game.moveQueen(pos);
            this.userMoves += 1;
           if (result) {
            if (this.endGameVariable.value) {
              this.endGameBackValue();
            } else {
              this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
            }
           } else {
            this.sendMessageMove(this.figureCoords.id + '-' + pos.x + '-' + pos.y + '-' + result + '-' + this.username);
           }
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'queen';
              this.openDialog();
            console.log('NIe prawidlowy ruch Queen');
          }
        }

    } else {
        console.error('Check');
    }
    console.log(pos);
}

setFigure(id: string) {
  if (this.figureCoords.id === 'zero') {
    this.figureCoords.id = id;
    this.figureCoords.isCheck = true;
  } else if (this.figureCoords.id !== 'zero') {
    this.figureCoords.id = 'zero';
    this.figureCoords.isCheck = false;
  }

  console.log(this.figureCoords.id);
}

setKingStyle() {
  if (this.figureCoords.id === 'king') {
  return this.figureCoords.isCheck;
  }
}

setQueenStyle() {
  if (this.figureCoords.id === 'queen') {
  return this.figureCoords.isCheck;
  }
}

setKnightStyle() {
  if (this.figureCoords.id === 'knight') {
  return this.figureCoords.isCheck;
  }
}

setKnight2Style() {
  if (this.figureCoords.id === 'knight2') {
  return this.figureCoords.isCheck;
  }
}

setRookStyle() {
  if (this.figureCoords.id === 'rook') {
  return this.figureCoords.isCheck;
  }
}

setRook2Style() {
  if (this.figureCoords.id === 'rook2') {
  return this.figureCoords.isCheck;
  }
}

setBishopStyle() {
  if (this.figureCoords.id === 'bishop') {
  return this.figureCoords.isCheck;
  }
}

setBishop2Style() {
  if (this.figureCoords.id === 'bishop2') {
  return this.figureCoords.isCheck;
  }
}

setPawnStyle() {
  if (this.figureCoords.id === 'pawn') {
  return this.figureCoords.isCheck;
  }
}

setPawn2Style() {
  if (this.figureCoords.id === 'pawn2') {
  return this.figureCoords.isCheck;
  }
}

setPawn3Style() {
  if (this.figureCoords.id === 'pawn3') {
  return this.figureCoords.isCheck;
  }
}

setPawn4Style() {
  if (this.figureCoords.id === 'pawn4') {
  return this.figureCoords.isCheck;
  }
}

setPawn5Style() {
  if (this.figureCoords.id === 'pawn5') {
  return this.figureCoords.isCheck;
  }
}

setPawn6Style() {
  if (this.figureCoords.id === 'pawn6') {
  return this.figureCoords.isCheck;
  }
}

setPawn7Style() {
  if (this.figureCoords.id === 'pawn7') {
  return this.figureCoords.isCheck;
  }
}

setPawn8Style() {
  if (this.figureCoords.id === 'pawn8') {
  return this.figureCoords.isCheck;
  }
}

// dialog window open
openDialog(): void {
  const dialogRef = this.dialog.open(FigureErrorDialogComponent, {
    data: { nameFigure: this.errorFigure }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.errorFigure = '';
  });
}

openOppoentMovesDialog(dialogContent: string) {

     this.dialog.open(OpponentDialogComponent, {
        data: { dialogVariable: dialogContent},
        disableClose: true
      });
  }

// end game function button
gameRoomBackValue() {
  console.log('Jestem w gameRoomBackValue!!!');
    const matchResult = this.match;
    matchResult.status = 'FINISHED';
    console.log('Przed zapisasz: ' + matchResult.userOneId + ' ' + this.userId);
    if (matchResult.userOneId === this.userId) {
      console.log('Zapisuje jedengo');
        matchResult.whoWon = matchResult.userTwoId;
        matchResult.userOneMoves = this.userMoves;
        matchResult.userOneRoundsTime = this.userRoundTime;
    } else {
      console.log('Zapisuje drugiego');
        matchResult.whoWon = matchResult.userOneId;
        matchResult.userTwoMoves = this.userMoves;
        matchResult.userTwoRoundsTime = this.userRoundTime;
    }
    console.log('matchResult: ' + matchResult.status);
    this.matchBack.emit(matchResult);
    this.sendMessageMove('END' + '-');
}

endGameBackValue() {
  console.log('Jestem w endGameBackValue!!!');
  const matchResult = this.match;
    matchResult.status = 'FINISHED';
    console.log('Przed zapisasz: ' + matchResult.userOneId + ' ' + this.userId);
    if (matchResult.userOneId === this.userId) {
      console.log('Zapisuje jedengo');
        matchResult.whoWon = matchResult.userOneId;
        matchResult.userOneMoves = this.userMoves;
        matchResult.userOneRoundsTime = this.userRoundTime;
    } else {
      console.log('Zapisuje drugiego');
        matchResult.whoWon = matchResult.userTwoId;
        matchResult.userTwoMoves = this.userMoves;
        matchResult.userTwoRoundsTime = this.userRoundTime;
    }
    console.log('matchResult: ' + matchResult.status);
    // ----------------------
    this.errorFigure = 'WIN';
    this.openDialog();
    // ----------------------
    this.matchBack.emit(matchResult);
    this.sendMessageMove('END' + '-');

    if (this.userTurn === false) {
      this.game.updateUserTurn(true);
    }
}

// web socket connection
initializeWebSocketConnection() {
  this.webSocketService.globalGameUpdate.subscribe((data) => {
    const messageTab = data.split(';', 5);
    if (messageTab[0] === 'game') {
      if (messageTab[3] === this.username) {
        console.log('MessageMOveOpponent: ' + messageTab[4]);
        this.opponentMove(messageTab[4]);
      }
    }
  });
}

// web socket message
sendMessageMove(message) {
  if (this.userId === this.match.userOneId) {
    this.webSocketService.sendMessage('game', this.match.name, this.match.userOneId, this.match.userTwoId, message);
  } else {
    this.webSocketService.sendMessage('game', this.match.name, this.match.userTwoId, this.match.userOneId, message);
  }
   if (this.userTurn) {
    console.log('Resetuje czas Unsubscirbe');
      if (this.minutes !== 0) {
        this.userRoundTime += ((this.minutes / 60) + this.seconds);
        console.log('UserRoundTime ' + this.userRoundTime);
      } else {
        this.userRoundTime += this.seconds;
        console.log('UserRoundTime ' + this.userRoundTime);
      }
    this.subscription.unsubscribe();
    this.minutes = 0;
    this.seconds = 0;
    this.userTurn = false;
    this.game.updateUserTurn(false);
    this.openOppoentMovesDialog('true');
   }
}

// opponent movement
opponentMove(move: string) {
  const tabMove = move.split('-', 5);
  if (tabMove[0] === 'END') {
    console.log('Jestem w opponentMove END!!!');
    const matchResult = this.match;
    matchResult.status = 'FINISHED';
    if (matchResult.userOneId === this.userId) {
        matchResult.userOneMoves = this.userMoves;
        matchResult.userOneRoundsTime = this.userRoundTime;
    } else {
        matchResult.userTwoMoves = this.userMoves;
        matchResult.userTwoRoundsTime = this.userRoundTime;
    }
    this.matchBack.emit(matchResult);
    // ----------------------
    this.errorFigure = 'END';
    this.openDialog();
  } else {
    if (tabMove[4] !== this.username) {
    this.game.moveFigure(tabMove[0], this.makeCoor(tabMove[1], tabMove[2]), Boolean(tabMove[3]));
    this.userTurn = true;
    this.game.updateUserTurn(true);
    console.log('Odpalam czas znowu');
        this.minutes = 0;
        this.seconds = 0;
        this.startCountTime();
    }
  }
}

makeCoor(posx: string, posy: string): Coord {
  return {x: (Number(posx)), y: Math.abs(Number(posy) - 7)};
}

fullScreen() {
  const elem = document.documentElement;
  const methodToBeInvoked = elem.requestFullscreen ||
    elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
  if (methodToBeInvoked) { methodToBeInvoked.call(elem); }
}

}
