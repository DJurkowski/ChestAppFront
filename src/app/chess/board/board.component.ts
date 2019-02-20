import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GameRoom } from '../gameRoom';
import { GameService } from '../game.service';
import { MatDialog } from '@angular/material';
import { Coord } from '../coord';
import { Stomp} from 'stompjs/lib/stomp.js';
import SockJS from 'sockjs-client';
import { FigureErrorDialogComponent } from '../figure-error-dialog/figure-error-dialog.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() gameRoom: GameRoom;
  @Output() gameRoomBack = new EventEmitter<GameRoom>();
  // dopisac logike do zakonczenie gry i czas gry

  private stompClient;
  private serverUrl = 'http://localhost:8080/api/auth/socket';

  username: string;

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


  errorFigure = '';

  figureCoords = {
    id: 'zero',
    position: null,
    isCheck: false
  };

  constructor(private game: GameService, public dialog: MatDialog, private token: TokenStorageService) {
    this.initializeWebSocketConnection();
    this.username = token.getUsername();
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

  ngOnInit() {
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
            // musimy zwrocic boolean czy mamy zbicie czy nie
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
        } else if (this.figureCoords.id === 'pawnN') {
            if (this.game.canMovePawnN(pos)) {
              this.game.movePawnN(pos);
              this.sendMessageMove(this.figureCoords.id + ';' + pos.x + ';' + pos.y);
              this.figureCoords.id = 'zero';
              this.figureCoords.isCheck = false;
            } else {
                this.errorFigure = 'pawnN';
                this.openDialog();
              console.log('NIe prawidlowy ruch PawnN');
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
  const gameRoomResult = this.gameRoom;
    gameRoomResult.status = 'finished';
    console.log('GameRoomResult: ' + gameRoomResult.status);
    this.gameRoomBack.emit(gameRoomResult);
}

// web socket connection
initializeWebSocketConnection() {
  const ws = new SockJS(this.serverUrl);
  this.stompClient = Stomp.over(ws);
  const that = this;
  this.stompClient.connect({}, function(frame) {
    that.stompClient.subscribe('/gameRoom/' + that.gameRoom.name, (message) => {
      if (message.body) {
        console.log('Dostalem message taki bo tak : ' + message.body);
        that.opponentMove(message.body);
      }
    });
  });
}

sendMessageMove(message) {
  this.stompClient.send('/api/game/' + this.gameRoom.name, {}, message);
}

// opponent movement
opponentMove(move: string) {
  const tabMove = move.split(';');
  if (tabMove[3] !== this.username) {
  // if(ktory uzytkownik wykonal ruch bo tak to bedziemy ruszac i tym i tym bez sensu)
  this.game.moveFigure(tabMove[0], this.makeCoor(tabMove[1], tabMove[2]));
  console.log('Moveopponent: ' + tabMove);
  }

}

makeCoor(posx: string, posy: string): Coord {
  return {x: (Math.abs(Number(posx) - 7)), y: Math.abs(Number(posy) - 7)};
}
}
