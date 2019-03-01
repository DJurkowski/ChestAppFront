import { UserService } from './../../services/user.service';
import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { GameRoom } from '../gameRoom';
import { GameService } from '../game.service';
import { MatDialog } from '@angular/material';
import { Coord } from '../coord';
import { Stomp} from 'stompjs/lib/stomp.js';
import SockJS from 'sockjs-client';
import { FigureErrorDialogComponent } from '../figure-error-dialog/figure-error-dialog.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Match } from 'src/app/match/match';
import { Observable, Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  @Input() match: Match;
  @Output() matchBack = new EventEmitter<Match>();
  // dopisac logike do zakonczenie gry i czas gry

  private stompClient;
  private serverUrl = 'http://localhost:8080/api/auth/socket';

  username: string;
  userId: number;
  userIdentification: Observable<Object>;

  // zegar
  public minutes = 0;
  public seconds = 0;
  private subscription: Subscription;

  sixtyFour = new Array(64).fill(0).map((_, i) => i);

  knightPosition$ = this.game.knightPosition$;
  knight2Position$ = this.game.knight2Position$;
  kingPosition$ = this.game.kingPosition$;

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
  kingNPosition$ = this.game.kingNPosition$;


  errorFigure = '';

  figureCoords = {
    id: 'zero',
    position: null,
    isCheck: false
  };

  constructor(private game: GameService, public dialog: MatDialog, private token: TokenStorageService,
    private userService: UserService) {
    this.initializeWebSocketConnection();
    this.username = this.token.getUsername();
    this.userIdentification = this.userService.getUserId(this.username);
    console.log('Jestem Prdzed');
    this.userIdentification.subscribe(data => {
      this.userId = Number(data);
      console.log('User Identification' + this.userId);
    });
  }

// timer
  ngOnInit() {
    const timer = TimerObservable.create(0, 1000);
    this.subscription = timer.subscribe(t => {
      if (t % 60 === 0 && t !== 0) {
        this.minutes += 1;
      } else {
        if (this.minutes !== 0) {
          this.seconds = (t - (this.minutes * 60));
        } else {
          this.seconds = t;
        }
      }
      // console.log('Timer: ' + this.minutes + ' : ' + this.seconds );
    });

  }

  ngOnDestroy() {
    console.log('OnDestroye ....');
    this.subscription.unsubscribe();
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
    if (this.figureCoords.id !== 'zero') {
        if (this.figureCoords.id === 'knight') {
          if (this.game.canMoveKnight(pos)) {
            this.game.moveKnight(pos);
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'knight';
              this.openDialog();
            console.log('NIe prawidlowy ruch Knight');
          }
        } else if (this.figureCoords.id === 'king') {
          if (this.game.canMoveKing(pos)) {
          this.game.moveKing(pos);
          this.sendMessageMove(this.figureCoords.id + ';' + pos.x + ';' + pos.y + ';' + this.username);
          this.figureCoords.id = 'zero';
          this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'king';
              this.openDialog();
             console.log('NIe prawidlowy ruch King');
          }
        } else if (this.figureCoords.id === 'knight2') {
          if (this.game.canMoveKnight2(pos)) {
            this.game.moveKnight2(pos);
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'knight2';
              this.openDialog();
            console.log('NIe prawidlowy ruch Knight2');
          }
        } else if (this.figureCoords.id === 'pawn') {
          if (this.game.canMovePawn(pos)) {
            this.game.movePawn(pos);
            // musimy zwrocic boolean czy mamy zbicie czy nie!!!
            this.sendMessageMove(this.figureCoords.id + ';' + pos.x + ';' + pos.y + ';' + this.username);
            this.figureCoords.id = 'zero';
            this.figureCoords.isCheck = false;
          } else {
              this.errorFigure = 'pawn';
              this.openDialog();
            console.log('NIe prawidlowy ruch Pawn');
          }
        } else if (this.figureCoords.id === 'pawn2') {
            if (this.game.canMovePawn2(pos)) {
              this.game.movePawn2(pos);
              this.figureCoords.id = 'zero';
              this.figureCoords.isCheck = false;
            } else {
                this.errorFigure = 'pawn2';
                this.openDialog();
              console.log('NIe prawidlowy ruch Pawn2');
            }
          }
        // } else if (this.figureCoords.id === 'pawnN') {
        //     if (this.game.canMovePawnN(pos)) {
        //       this.game.movePawnN(pos);
        //       this.sendMessageMove(this.figureCoords.id + ';' + pos.x + ';' + pos.y + ';' + this.username);
        //       this.figureCoords.id = 'zero';
        //       this.figureCoords.isCheck = false;
        //     } else {
        //         this.errorFigure = 'pawnN';
        //         this.openDialog();
        //       console.log('NIe prawidlowy ruch PawnN');
        //     }
        //   }
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

// Negative
// setPawnNStyle() {
//   if (this.figureCoords.id === 'pawnN') {
//   return this.figureCoords.isCheck;
//   }
// }

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

// end game function button
gameRoomBackValue() {
  const matchResult = this.match;
    matchResult.status = 'FINISHED';
    console.log('Przed zapisasz: ' + matchResult.userOneId + ' ' + this.userId);
    if (matchResult.userOneId === this.userId) {
      console.log('Zapisuje jedengo');
        matchResult.whoWon = matchResult.userTwoId;
    } else {
      console.log('Zapisuje drugiego');
        matchResult.whoWon = matchResult.userOneId;
    }
    console.log('matchResult: ' + matchResult.status);
    this.matchBack.emit(matchResult);
    this.sendMessageMove('END' + ';');
}

// web socket connection
initializeWebSocketConnection() {
  const ws = new SockJS(this.serverUrl);
  this.stompClient = Stomp.over(ws);
  const that = this;
  this.stompClient.connect({}, function(frame) {
    that.stompClient.subscribe('/gameRoom/' + that.match.name, (message) => {
      if (message.body) {
        console.log('Dostalem message taki bo tak : ' + message.body);
        that.opponentMove(message.body);
      }
    });
  });
}
// web socket message
sendMessageMove(message) {
  this.stompClient.send('/api/game/' + this.match.name, {}, message);
}

// opponent movement
opponentMove(move: string) {
  const tabMove = move.split(';');
  if (tabMove[0] === 'END') {
    const matchResult = this.match;
    matchResult.status = 'FINISHED';
    this.matchBack.emit(matchResult);
  } else {
    if (tabMove[3] !== this.username) {
    this.game.moveFigure(tabMove[0], this.makeCoor(tabMove[1], tabMove[2]));
    console.log('Moveopponent: ' + tabMove);
    }
  }
}

makeCoor(posx: string, posy: string): Coord {
  return {x: (Number(posx)), y: Math.abs(Number(posy) - 7)};
}

}
