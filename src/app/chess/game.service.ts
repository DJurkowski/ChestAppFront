import { Injectable, OnInit } from '@angular/core';
import { Coord } from './coord';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

export interface FigureType {
  position: Coord;
  color: boolean;
  // true = white / false = black
  namefigure: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {


  userTurn: Boolean;
  userTurnUpdate: Observable<Boolean>;
  userTurnObserver: Observer<Boolean>;

  userPointsObservable = new BehaviorSubject<Number>(0);
  actualUserPoints: Number;

  endGameObservable = new BehaviorSubject<Boolean>(false);
  endGameVariable: Boolean;

  currentPositions: FigureType [] = new Array<FigureType>();

  knightPosition$ = new BehaviorSubject<Coord>({ x: 1, y: 7});
  knightCurrentPosition: Coord;
  knight2Position$ = new BehaviorSubject<Coord>({ x: 6, y: 7});
  knight2CurrentPosition: Coord;
  kingPosition$ = new BehaviorSubject<Coord>({ x: 4, y: 7});
  kingCurrentPosition: Coord;
  rookPosition$ = new BehaviorSubject<Coord>({ x: 0, y: 7});
  rookCurrentPosition: Coord;
  rook2Position$ = new BehaviorSubject<Coord>({ x: 7, y: 7});
  rook2CurrentPosition: Coord;
  bishopPosition$ = new BehaviorSubject<Coord>({ x: 2, y: 7});
  bishopCurrentPosition: Coord;
  bishop2Position$ = new BehaviorSubject<Coord>({ x: 5, y: 7});
  bishop2CurrentPosition: Coord;
  queenPosition$ = new BehaviorSubject<Coord>({ x: 3, y: 7});
  queenCurrentPosition: Coord;

  pawnPosition$ = new BehaviorSubject<Coord>({ x: 0, y: 6});
  pawnCurrentPosition: Coord;
  pawn2Position$ = new BehaviorSubject<Coord>({ x: 1, y: 6});
  pawn2CurrentPosition: Coord;
  pawn3Position$ = new BehaviorSubject<Coord>({ x: 2, y: 6});
  pawn3CurrentPosition: Coord;
  pawn4Position$ = new BehaviorSubject<Coord>({ x: 3, y: 6});
  pawn4CurrentPosition: Coord;
  pawn5Position$ = new BehaviorSubject<Coord>({ x: 4, y: 6});
  pawn5CurrentPosition: Coord;
  pawn6Position$ = new BehaviorSubject<Coord>({ x: 5, y: 6});
  pawn6CurrentPosition: Coord;
  pawn7Position$ = new BehaviorSubject<Coord>({ x: 6, y: 6});
  pawn7CurrentPosition: Coord;
  pawn8Position$ = new BehaviorSubject<Coord>({ x: 7, y: 6});
  pawn8CurrentPosition: Coord;

  pawnNPosition$ = new BehaviorSubject<Coord>({ x: 0, y: 1});
  pawnNCurrentPosition: Coord;
  pawn2NPosition$ = new BehaviorSubject<Coord>({ x: 1, y: 1});
  pawn2NCurrentPosition: Coord;
  pawn3NPosition$ = new BehaviorSubject<Coord>({ x: 2, y: 1});
  pawn3NCurrentPosition: Coord;
  pawn4NPosition$ = new BehaviorSubject<Coord>({ x: 3, y: 1});
  pawn4NCurrentPosition: Coord;
  pawn5NPosition$ = new BehaviorSubject<Coord>({ x: 4, y: 1});
  pawn5NCurrentPosition: Coord;
  pawn6NPosition$ = new BehaviorSubject<Coord>({ x: 5, y: 1});
  pawn6NCurrentPosition: Coord;
  pawn7NPosition$ = new BehaviorSubject<Coord>({ x: 6, y: 1});
  pawn7NCurrentPosition: Coord;
  pawn8NPosition$ = new BehaviorSubject<Coord>({ x: 7, y: 1});
  pawn8NCurrentPosition: Coord;

  kingNPosition$ = new BehaviorSubject<Coord>({ x: 4, y: 0});
  kingNCurrentPosition: Coord;
  knightNPosition$ = new BehaviorSubject<Coord>({ x: 1, y: 0});
  knightNCurrentPosition: Coord;
  knight2NPosition$ = new BehaviorSubject<Coord>({ x: 6, y: 0});
  knight2NCurrentPosition: Coord;
  rookNPosition$ = new BehaviorSubject<Coord>({ x: 0, y: 0});
  rookNCurrentPosition: Coord;
  rook2NPosition$ = new BehaviorSubject<Coord>({ x: 7, y: 0});
  rook2NCurrentPosition: Coord;
  bishopNPosition$ = new BehaviorSubject<Coord>({ x: 2, y: 0});
  bishopNCurrentPosition: Coord;
  bishop2NPosition$ = new BehaviorSubject<Coord>({ x: 5, y: 0});
  bishop2NCurrentPosition: Coord;
  queenNPosition$ = new BehaviorSubject<Coord>({ x: 3, y: 0});
  queenNCurrentPosition: Coord;


  constructor() {

    console.log('Constructor Game Service');
    // this.actualUserPoints = 0;

    // this.userTurnObservable.subscribe(userTurn => {
    //   this.userTurnVariable = userTurn;
    // });

    this.userTurnUpdate = Observable.create((observer: Observer<Boolean>) => {
      this.userTurnObserver = observer;
    });

    this.endGameObservable.subscribe(endGame => {
      this.endGameVariable = endGame;
    });

    this.userPointsObservable.subscribe(points => {
      this.actualUserPoints = points;
    });

    this.kingPosition$.subscribe(kingp => {
      this.kingCurrentPosition = kingp;
    });

    this.queenPosition$.subscribe(queenp => {
      this.queenCurrentPosition = queenp;
    });

    this.knightPosition$.subscribe(knightp => {
      this.knightCurrentPosition = knightp;
    });

    this.knight2Position$.subscribe(knight2p => {
      this.knight2CurrentPosition = knight2p;
    });

    this.rookPosition$.subscribe(rookp => {
      this.rookCurrentPosition = rookp;
    });

    this.rook2Position$.subscribe(rook2p => {
      this.rook2CurrentPosition = rook2p;
    });

    this.bishopPosition$.subscribe(bishopp => {
      this.bishopCurrentPosition = bishopp;
    });

    this.bishop2Position$.subscribe(bishop2p => {
      this.bishop2CurrentPosition = bishop2p;
    });

    this.pawnPosition$.subscribe(pawnp => {
      this.pawnCurrentPosition = pawnp;
    });

    this.pawn2Position$.subscribe(pawn2p => {
      this.pawn2CurrentPosition = pawn2p;
    });

    this.pawn3Position$.subscribe(pawn3p => {
      this.pawn3CurrentPosition = pawn3p;
    });

    this.pawn4Position$.subscribe(pawn4p => {
      this.pawn4CurrentPosition = pawn4p;
    });

    this.pawn5Position$.subscribe(pawn5p => {
      this.pawn5CurrentPosition = pawn5p;
    });

    this.pawn6Position$.subscribe(pawn6p => {
      this.pawn6CurrentPosition = pawn6p;
    });

    this.pawn7Position$.subscribe(pawn7p => {
      this.pawn7CurrentPosition = pawn7p;
    });

    this.pawn8Position$.subscribe(pawn8p => {
      this.pawn8CurrentPosition = pawn8p;
    });

    // Negative
    this.pawnNPosition$.subscribe(pawnNp => {
      this.pawnNCurrentPosition = pawnNp;
    });

    this.pawn2NPosition$.subscribe(pawn2Np => {
      this.pawn2NCurrentPosition = pawn2Np;
    });

    this.pawn3NPosition$.subscribe(pawn3Np => {
      this.pawn3NCurrentPosition = pawn3Np;
    });

    this.pawn4NPosition$.subscribe(pawn4Np => {
      this.pawn4NCurrentPosition = pawn4Np;
    });

    this.pawn5NPosition$.subscribe(pawn5Np => {
      this.pawn5NCurrentPosition = pawn5Np;
    });

    this.pawn6NPosition$.subscribe(pawn6Np => {
      this.pawn6NCurrentPosition = pawn6Np;
    });

    this.pawn7NPosition$.subscribe(pawn7Np => {
      this.pawn7NCurrentPosition = pawn7Np;
    });

    this.pawn8NPosition$.subscribe(pawn8Np => {
      this.pawn8NCurrentPosition = pawn8Np;
    });

    this.kingNPosition$.subscribe(kingNp => {
      this.kingNCurrentPosition = kingNp;
    });

    this.knightNPosition$.subscribe(knightNp => {
      this.knightNCurrentPosition = knightNp;
    });

    this.knight2NPosition$.subscribe(knight2Np => {
      this.knight2NCurrentPosition = knight2Np;
    });

    this.rookNPosition$.subscribe(rookNp => {
      this.rookNCurrentPosition = rookNp;
    });

    this.rook2NPosition$.subscribe(rook2Np => {
      this.rook2NCurrentPosition = rook2Np;
    });

    this.bishopNPosition$.subscribe(bishopNp => {
      this.bishopNCurrentPosition = bishopNp;
    });

    this.bishop2NPosition$.subscribe(bishop2Np => {
      this.bishop2NCurrentPosition = bishop2Np;
    });

    this.queenNPosition$.subscribe(queenNp => {
      this.queenNCurrentPosition = queenNp;
    });

    this.currentPositions.push( {
      position: this.kingCurrentPosition,
      color: true,
      namefigure: 'king'
    });

    this.currentPositions.push( {
      position: this.queenCurrentPosition,
      color: true,
      namefigure: 'queen'
    });

    this.currentPositions.push( {
      position: this.knightCurrentPosition,
      color: true,
      namefigure: 'knight'
    });

    this.currentPositions.push( {
      position: this.knight2CurrentPosition,
      color: true,
      namefigure: 'knight2'
    });

    this.currentPositions.push( {
      position: this.rookCurrentPosition,
      color: true,
      namefigure: 'rook'
    });

    this.currentPositions.push( {
      position: this.rook2CurrentPosition,
      color: true,
      namefigure: 'rook2'
    });

    this.currentPositions.push( {
      position: this.bishopCurrentPosition,
      color: true,
      namefigure: 'bishop'
    });

    this.currentPositions.push( {
      position: this.bishop2CurrentPosition,
      color: true,
      namefigure: 'bishop2'
    });

    this.currentPositions.push( {
      position: this.pawnCurrentPosition,
      color: true,
      namefigure: 'pawn'
    });

    this.currentPositions.push( {
      position: this.pawn2CurrentPosition,
      color: true,
      namefigure: 'pawn2'
    });

    this.currentPositions.push( {
      position: this.pawn3CurrentPosition,
      color: true,
      namefigure: 'pawn3'
    });

    this.currentPositions.push( {
      position: this.pawn4CurrentPosition,
      color: true,
      namefigure: 'pawn4'
    });

    this.currentPositions.push( {
      position: this.pawn5CurrentPosition,
      color: true,
      namefigure: 'pawn5'
    });

    this.currentPositions.push( {
      position: this.pawn6CurrentPosition,
      color: true,
      namefigure: 'pawn6'
    });

    this.currentPositions.push( {
      position: this.pawn7CurrentPosition,
      color: true,
      namefigure: 'pawn7'
    });

    this.currentPositions.push( {
      position: this.pawn8CurrentPosition,
      color: true,
      namefigure: 'pawn8'
    });

      // Negative
    this.currentPositions.push( {
      position: this.pawnNCurrentPosition,
      color: false,
      namefigure: 'pawnN'
    });

    this.currentPositions.push( {
      position: this.pawn2NCurrentPosition,
      color: false,
      namefigure: 'pawn2N'
    });

    this.currentPositions.push( {
      position: this.pawn3NCurrentPosition,
      color: false,
      namefigure: 'pawn3N'
    });

    this.currentPositions.push( {
      position: this.pawn4NCurrentPosition,
      color: false,
      namefigure: 'pawn4N'
    });

    this.currentPositions.push( {
      position: this.pawn5NCurrentPosition,
      color: false,
      namefigure: 'pawn5N'
    });

    this.currentPositions.push( {
      position: this.pawn6NCurrentPosition,
      color: false,
      namefigure: 'pawn6N'
    });

    this.currentPositions.push( {
      position: this.pawn7NCurrentPosition,
      color: false,
      namefigure: 'pawn7N'
    });

    this.currentPositions.push( {
      position: this.pawn8NCurrentPosition,
      color: false,
      namefigure: 'pawn8N'
    });

    this.currentPositions.push({
      position: this.kingNCurrentPosition,
      color: false,
      namefigure: 'kingN'
    });

    this.currentPositions.push({
      position: this.queenNCurrentPosition,
      color: false,
      namefigure: 'queenN'
    });

    this.currentPositions.push( {
      position: this.knightNCurrentPosition,
      color: false,
      namefigure: 'knightN'
    });

    this.currentPositions.push( {
      position: this.knight2NCurrentPosition,
      color: false,
      namefigure: 'knight2N'
    });

    this.currentPositions.push( {
      position: this.rookNCurrentPosition,
      color: false,
      namefigure: 'rookN'
    });

    this.currentPositions.push( {
      position: this.rook2NCurrentPosition,
      color: false,
      namefigure: 'rook2N'
    });

    this.currentPositions.push( {
      position: this.bishopNCurrentPosition,
      color: false,
      namefigure: 'bishopN'
    });

    this.currentPositions.push( {
      position: this.bishop2NCurrentPosition,
      color: false,
      namefigure: 'bishop2N'
    });

  }

  updateUserTurn(variabel: Boolean) {
    this.userTurn = variabel;
    this.userTurnObserver.next(this.userTurn);
  }

  canMoveFigure(to: Coord, figureName: string) {
    switch (figureName) {
      case 'pawn':
        return this.pawnMovementPosibility(to, this.pawnCurrentPosition);
      case 'pawn2':
        return this.pawnMovementPosibility(to, this.pawn2CurrentPosition);
      case 'pawn3':
        return this.pawnMovementPosibility(to, this.pawn3CurrentPosition);
      case 'pawn4':
        return this.pawnMovementPosibility(to, this.pawn4CurrentPosition);
      case 'pawn5':
        return this.pawnMovementPosibility(to, this.pawn5CurrentPosition);
      case 'pawn6':
        return this.pawnMovementPosibility(to, this.pawn6CurrentPosition);
      case 'pawn7':
        return this.pawnMovementPosibility(to, this.pawn7CurrentPosition);
      case 'pawn8':
        return this.pawnMovementPosibility(to, this.pawn8CurrentPosition);
      case 'king':
        return this.kingMovementPosibility(to, this.kingCurrentPosition);
      case 'queen':
        return this.queenMovementPosibility(to, this.queenCurrentPosition);
      case 'knight':
        return this.knightMovementPosibility(to, this.knightCurrentPosition);
      case 'knight2':
        return this.knightMovementPosibility(to, this.knight2CurrentPosition);
      case 'rook':
        return this.rookMovementPosibility(to, this.rookCurrentPosition);
      case 'rook2':
        return this.rookMovementPosibility(to, this.rook2CurrentPosition);
      case 'bishop':
        return this.bishopMovementPosibility(to, this.bishopCurrentPosition);
      case 'bishop2':
        return this.bishopMovementPosibility(to, this.bishop2CurrentPosition);

    }
  }

  moveQueen(to: Coord) {
    const { x, y } = this.queenCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === i && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === -i && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === i && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === -i && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === 0 && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === 0 && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === i && dy === 0) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }

      } else if (dx === -i && dy === 0) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.queenPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'queen') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.queenPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'queen') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      }
    }
  }

  queenMovementPosibility(to: Coord, currentPosition: Coord) {
    const { x, y } = currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === i && dy === i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y + i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x + k) && j.position.y === (y + k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === -i && dy === i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y + i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x - k) && j.position.y === (y + k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === i && dy === -i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y - i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x + k) && j.position.y === (y - k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === -i && dy === -i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y - i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x - k) && j.position.y === (y - k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === 0 && dy === i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x) && j.position.y === (y + i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x) && j.position.y === (y + k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === 0 && dy === -i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x) && j.position.y === (y - i)) ) {
              console.log('Jestem 3');
              return false;
            }
          }
        }
        if (-i !== -1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x) && j.position.y === (y - k)) ) {
                console.log('Jestem 4');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === i && dy === 0) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y)) ) {
              console.log('Jestem 5');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x + k) && j.position.y === (y)) ) {
              console.log('Jestem 6');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === -i && dy === 0) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y)) ) {
              console.log('Jestem 7');
              return false;
            }
          }
        }
        if (-i !== -1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x - k) && j.position.y === (y)) ) {
              console.log('Jestem 8');
                  return false;
                }
            }
          }
        }
        return true;
      }
    }
  }

  moveBishop2(to: Coord) {
    const { x, y } = this.bishop2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === i && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishop2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishop2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === -i && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishop2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishop2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === i && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishop2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishop2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === -i && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishop2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishop2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      }
    }
  }
// dokonczyc
  moveBishop(to: Coord) {
    const { x, y } = this.bishopCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === i && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishopPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishopPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === -i && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishopPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishopPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === i && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishopPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishopPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === -i && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.bishopPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'bishop') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.bishopPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'bishop') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      }


    }
  }

  bishopMovementPosibility(to: Coord, currentPosition: Coord) {
    const { x, y } = currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === i && dy === i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y + i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x + k) && j.position.y === (y + k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === -i && dy === i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y + i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x - k) && j.position.y === (y + k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === i && dy === -i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y - i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x + k) && j.position.y === (y - k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === -i && dy === -i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y - i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x - k) && j.position.y === (y - k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      }
    }
  }

  moveRook2(to: Coord) {
    const { x, y } = this.rook2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === 0 && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rook2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rook2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === 0 && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rook2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rook2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === i && dy === 0) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rook2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rook2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }

      } else if (dx === -i && dy === 0) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rook2Position$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook2') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rook2Position$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook2') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      }
    }
  }

  moveRook(to: Coord) {
    const { x, y } = this.rookCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === 0 && dy === i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x) && j.position.y === (y + i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rookPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rookPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === 0 && dy === -i) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x) && j.position.y === (y - i)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rookPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rookPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      } else if (dx === i && dy === 0) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rookPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rookPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }

      } else if (dx === -i && dy === 0) {
        for (const j of this.currentPositions) {
          if (!j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y)) ) {
              if (this.unsubscribeFigure(j.namefigure)) {
                this.rookPosition$.next(to);
                for (const k of this.currentPositions) {
                  if (k.namefigure === 'rook') {
                    k.position.x = to.x;
                    k.position.y = to.y;
                    return true;
                  }
                }
              }
            }
          }
        }
        this.rookPosition$.next(to);
        for (const k of this.currentPositions) {
          if (k.namefigure === 'rook') {
            k.position.x = to.x;
            k.position.y = to.y;
            return false;
          }
        }
      }
    }
  }

  rookMovementPosibility(to: Coord, currentPosition: Coord) {
    const { x, y } = currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    for (let i = 1; i <= 7; i++) {

      if (dx === 0 && dy === i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x) && j.position.y === (y + i)) ) {
              console.log('Jestem 1');
              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x) && j.position.y === (y + k)) ) {
                console.log('Jestem 2');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === 0 && dy === -i) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x) && j.position.y === (y - i)) ) {
              console.log('Jestem 3');
              return false;
            }
          }
        }
        if (-i !== -1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x) && j.position.y === (y - k)) ) {
                console.log('Jestem 4');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === i && dy === 0) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x + i) && j.position.y === (y)) ) {
              console.log('Jestem 5');

              return false;
            }
          }
        }
        if (i !== 1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x + k) && j.position.y === (y)) ) {
              console.log('Jestem 6');
                  return false;
                }
            }
          }
        }
        return true;
      } else if (dx === -i && dy === 0) {

        for (const j of this.currentPositions) {
          if (j.color) {
            if ( (j.position.x === (x - i) && j.position.y === (y)) ) {
              console.log('Jestem 7');
              return false;
            }
          }
        }
        if (-i !== -1) {
          for (let k = (i - 1); k >= 1; k--) {
            for (const j of this.currentPositions) {
                if ( (j.position.x === (x - k) && j.position.y === (y)) ) {
              console.log('Jestem 8');

                  return false;
                }
            }
          }
        }
      }
      return true;
    }
  }

  moveKnight(to: Coord) {

    const { x, y } = this.knightCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (dx === 2 && dy === 1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 2) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 2 && dy === -1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 2) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -2 && dy === 1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 2) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -2 && dy === -1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 2) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -1 && dy === 2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y + 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -1 && dy === -2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === 2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y + 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === -2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knightPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knightPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    }
  }

  moveKnight2(to: Coord) {
    const { x, y } = this.knight2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (dx === 2 && dy === 1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 2) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 2 && dy === -1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 2) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -2 && dy === 1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 2) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -2 && dy === -1) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 2) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -1 && dy === 2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y + 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -1 && dy === -2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === 2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y + 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === -2) {
      for (const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 2)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.knight2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'knight2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.knight2Position$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'knight2') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    }
  }

  knightMovementPosibility(to: Coord, currentPosition: Coord) {
    const { x, y } = currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (dx === 2 && dy === 1) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 2) && i.position.y === (y + 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === 2 && dy === -1) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 2) && i.position.y === (y - 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === -2 && dy === 1) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 2) && i.position.y === (y + 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === -2 && dy === -1) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 2) && i.position.y === (y - 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === -1 && dy === 2) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y + 2)) ) {
            return false;
          }
        }
      }
    } else if (dx === -1 && dy === -2) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 2)) ) {
            return false;
          }
        }
      }
    } else if (dx === 1 && dy === 2) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y + 2)) ) {
            return false;
          }
        }
      }
    } else if (dx === 1 && dy === -2) {
      for (const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 2)) ) {
            return false;
          }
        }
      }
    }

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  }

  moveKing(to: Coord) {

    const { x, y } = this.kingCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (dx === -1 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 0 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === 0) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 1 && dy === -1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === 0 && dy === -1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -1 && dy === -1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    } else if (dx === -1 && dy === 0) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.kingPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'king') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
      this.kingPosition$.next(to);
      for (const i of this.currentPositions) {
        if (i.namefigure === 'king') {
          i.position.x = to.x;
          i.position.y = to.y;
          return false;
        }
      }
    }
  }

  kingMovementPosibility(to: Coord, currentPosition: Coord) {
    const { x, y } = currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (dx === -1 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y + 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === 0 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x) && i.position.y === (y + 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === 1 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y + 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === 1 && dy === 0) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y)) ) {
            return false;
          }
        }
      }
    } else if (dx === 1 && dy === -1) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === 0 && dy === -1) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x) && i.position.y === (y - 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === -1 && dy === -1) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            return false;
          }
        }
      }
    } else if (dx === -1 && dy === 0) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y)) ) {
            return false;
          }
        }
      }
    }

    return (Math.abs(dx) === 1 && Math.abs(dy) === 0) ||
           (Math.abs(dx) === 0 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 1) ;
  }

  movePawn(to: Coord) {

    const { x, y } = this.pawnCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawnPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawnPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawnPosition$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn2(to: Coord) {

    const { x, y } = this.pawn2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn2Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn2') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn2Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn2') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn3(to: Coord) {

    const { x, y } = this.pawn3CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn3Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn3') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn3Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn3') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn3Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn3') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn4(to: Coord) {

    const { x, y } = this.pawn4CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn4Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn4') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn4Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn4') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn4Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn4') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn5(to: Coord) {

    const { x, y } = this.pawn5CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn5Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn5') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn5Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn5') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn5Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn5') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn6(to: Coord) {

    const { x, y } = this.pawn6CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn6Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn6') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn6Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn6') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn6Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn6') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn7(to: Coord) {

    const { x, y } = this.pawn7CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn7Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn7') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn7Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn7') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn7Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn7') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  movePawn8(to: Coord) {

    const { x, y } = this.pawn8CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn8Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn8') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure)) {
              this.pawn8Position$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn8') {
                  j.position.x = to.x;
                  j.position.y = to.y;
                  return true;
                }
              }
            }
          }
        }
      }
    } else {
      this.pawn8Position$.next(to);
        for (const i of this.currentPositions) {
          if (i.namefigure === 'pawn8') {
            i.position.x = to.x;
            i.position.y = to.y;
            return false;
          }
        }
    }
  }

  pawnMovementPosibility(to: Coord, currentPosition: Coord) {
    const { x, y } = currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ( (dx === 1 && dy === -1) ) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            return true;
          }
        }
      }
    } else if ((dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            return true;
          }
        }
      }
    } else if ((Math.abs(dx) === 0 && dy === -1)) {
      for ( const i of this.currentPositions) {
          if ( (i.position.x === x && i.position.y === (y - 1)) ) {
            return false;
          }
      }
    } else if ((Math.abs(dx) === 0 && dy === -2)) {
      for ( const i of this.currentPositions) {
          if ( (i.position.x === x && i.position.y === (y - 2)) || (i.position.x === x && i.position.y === (y - 1)) ) {
            return false;
          }
      }
    }
    console.log(this.currentPositions);

    return (Math.abs(dx) === 0 && dy === -1) ||
          (Math.abs(dx) === 0 && dy === -2);
  }

  // Negative

  movePawnN(to: Coord) {
    this.pawnNPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawnN') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn2N(to: Coord) {
    this.pawn2NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn2N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn3N(to: Coord) {
    this.pawn3NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn3N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn4N(to: Coord) {
    this.pawn4NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn4N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn5N(to: Coord) {
    this.pawn5NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn5N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn6N(to: Coord) {
    this.pawn6NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn6N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn7N(to: Coord) {
    this.pawn7NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn7N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  movePawn8N(to: Coord) {
    this.pawn8NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn8N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveKingN(to: Coord) {
    this.kingNPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'kingN') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveQueenN(to: Coord) {
    this.queenNPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'queenN') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveKnightN(to: Coord) {
    this.knightNPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'knightN') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveKnight2N(to: Coord) {
    this.knight2NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'knight2N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveRookN(to: Coord) {
    this.rookNPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'rookN') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveRook2N(to: Coord) {
    this.rook2NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'rook2N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveBishopN(to: Coord) {
    this.bishopNPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'bishopN') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  moveBishop2N(to: Coord) {
    this.bishop2NPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'bishop2N') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  unsubscribeFigure (figurename: string) {

    console.log(this.currentPositions);

    const pos = {x: -1, y: -1};
    this.changePosition(figurename, pos);

    switch (figurename) {

      case 'king': {
        this.kingPosition$.next(pos);
        // this.kingPosition$.unsubscribe();
        this.scorePointsUser(5, 'sub');
        return true;
      }

      case 'queen': {
        this.queenPosition$.next(pos);
        // koniec gry!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // this.kingPosition$.unsubscribe();
        this.scorePointsUser(6, 'sub');
        return true;
      }

      case 'knight': {
        this.knightPosition$.next(pos);
        // this.knightPosition$.unsubscribe();
        this.scorePointsUser(3, 'sub');
        return true;
      }

      case 'knight2': {
        this.knight2Position$.next(pos);
        // this.knight2Position$.unsubscribe();
        this.scorePointsUser(3, 'sub');
        return true;
      }

      case 'rook': {
        this.rookPosition$.next(pos);
        // this.rookPosition$.unsubscribe();
        this.scorePointsUser(2, 'sub');
        return true;
      }

      case 'rook2': {
        this.rook2Position$.next(pos);
        // this.rook2Position$.unsubscribe();
        this.scorePointsUser(2, 'sub');
        return true;
      }

      case 'bishop': {
        this.bishopPosition$.next(pos);
        // this.rook2Position$.unsubscribe();
        this.scorePointsUser(4, 'sub');
        return true;
      }

      case 'bishop2': {
        this.bishop2Position$.next(pos);
        // this.rook2Position$.unsubscribe();
        this.scorePointsUser(4, 'sub');
        return true;
      }

      case 'pawn': {
        this.pawnPosition$.next(pos);
        // this.pawnPosition$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn2': {
        this.pawn2Position$.next(pos);
        // this.pawn2Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn3': {
        this.pawn3Position$.next(pos);
        // this.pawn3Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn4': {
        this.pawn4Position$.next(pos);
        // this.pawn4Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn5': {
        this.pawn5Position$.next(pos);
        // this.pawn5Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn6': {
        this.pawn6Position$.next(pos);
        // this.pawn6Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn7': {
        this.pawn7Position$.next(pos);
        // this.pawn7Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn8': {
        this.pawn8Position$.next(pos);
        // this.pawn8Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      // Negative
      case 'pawnN': {
        this.pawnNPosition$.next(pos);
        // this.pawnNPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn2N': {
        this.pawn2NPosition$.next(pos);
        // this.pawn2NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn3N': {
        this.pawn3NPosition$.next(pos);
        // this.pawn3NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn4N': {
        this.pawn4NPosition$.next(pos);
        // this.pawn4NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn5N': {
        this.pawn5NPosition$.next(pos);
        // this.pawn5NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn6N':
      this.pawn6NPosition$.next(pos);
      // this.pawn6NPosition$.unsubscribe();
      this.scorePointsUser(1, 'add');
      return true;

      case 'pawn7N': {
        this.pawn7NPosition$.next(pos);
        // this.pawn7NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn8N': {
        this.pawn8NPosition$.next(pos);
        // this.pawn8NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'kingN': {
        this.kingNPosition$.next(pos);
        // this.kingNPosition$.unsubscribe();
        this.scorePointsUser(5, 'add');
        return true;
      }

      case 'queenN': {
        this.queenNPosition$.next(pos);
        this.endGameObservable.next(true);
        // this.kingNPosition$.unsubscribe();
        this.scorePointsUser(6, 'add');
        return true;
      }

      case 'knightN': {
        this.knightNPosition$.next(pos);
        // this.knightNPosition$.unsubscribe();
        this.scorePointsUser(3, 'add');
        return true;
      }

      case 'knight2N': {
        this.knight2NPosition$.next(pos);
        // this.knight2NPosition$.unsubscribe();
        this.scorePointsUser(3, 'add');
        return true;
      }

      case 'rookN': {
        this.rookNPosition$.next(pos);
        // this.rookNPosition$.unsubscribe();
        this.scorePointsUser(2, 'add');
        return true;
      }

      case 'rook2N': {
        this.rook2NPosition$.next(pos);
        // this.rook2NPosition$.unsubscribe();
        this.scorePointsUser(2, 'add');
        return true;
      }

      case 'bishopN': {
        this.bishopNPosition$.next(pos);
        // this.rook2NPosition$.unsubscribe();
        this.scorePointsUser(2, 'add');
        return true;
      }

      case 'bishop2N': {
        this.bishop2NPosition$.next(pos);
        // this.rook2NPosition$.unsubscribe();
        this.scorePointsUser(2, 'add');
        return true;
      }

      default:
        return false;
    }

  }

  changePosition(figurename: string, pos: Coord) {
    for (const i of this.currentPositions) {
      if (i.namefigure === figurename) {
        i.position.x = pos.x;
        i.position.y = pos.y;
      }
    }
  }

  moveFigure(figurename: string, pos: Coord, capture: boolean) {
    if (capture) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ((i.position.x === pos.x && i.position.y === pos.y)) {
            this.unsubscribeFigure(i.namefigure);
          }
        }
      }
    }
    switch (figurename) {
      case 'pawn': {
        this.movePawnN(pos);
        break;
      }
      case 'pawn2': {
        this.movePawn2N(pos);
        break;
      }
      case 'pawn3': {
        this.movePawn3N(pos);
        break;
      }
      case 'pawn4': {
        this.movePawn4N(pos);
        break;
      }
      case 'pawn5': {
        this.movePawn5N(pos);
        break;
      }
      case 'pawn6': {
        this.movePawn6N(pos);
        break;
      }
      case 'pawn7': {
        this.movePawn7N(pos);
        break;
      }
      case 'pawn8': {
        this.movePawn8N(pos);
        break;
      }
      case 'king': {
        this.moveKingN(pos);
        break;
      }
      case 'queen': {
        this.moveQueenN(pos);
        break;
      }
      case 'knight': {
        this.moveKnightN(pos);
        break;
      }
      case 'knight2': {
        this.moveKnight2N(pos);
        break;
      }
      case 'rook': {
        this.moveRookN(pos);
        break;
      }
      case 'rook2': {
        this.moveRook2N(pos);
        break;
      }

      case 'bishop': {
        this.moveBishopN(pos);
        break;
      }

      case 'bishop2': {
        this.moveBishop2N(pos);
        break;
      }

    }
  }

  scorePointsUser(points: Number, func: string) {
    switch (func) {
      case 'add':
      this.userPointsObservable.next((this.actualUserPoints.valueOf() + points.valueOf()));
      break;
      case 'sub':
      this.userPointsObservable.next((this.actualUserPoints.valueOf() - points.valueOf()));
      break;
    }
  }

  resetFiguresPositions() {
    this.knightPosition$.next({ x: 1, y: 7});
    this.changePosition('knight', { x: 1, y: 7});
    this.knight2Position$.next({ x: 6, y: 7});
    this.changePosition('knight2', { x: 6, y: 7});
    this.kingPosition$.next({ x: 4, y: 7});
    this.changePosition('king', { x: 4, y: 7});
    this.rookPosition$.next({ x: 0, y: 7});
    this.changePosition('rook', { x: 0, y: 7});
    this.rook2Position$.next({ x: 7, y: 7});
    this.changePosition('rook2', { x: 7, y: 7});
    this.bishopPosition$.next({ x: 2, y: 7});
    this.changePosition('bishop', { x: 2, y: 7});
    this.bishop2Position$.next({ x: 5, y: 7});
    this.changePosition('bishop2', { x: 5, y: 7});
    this.queenPosition$.next({ x: 3, y: 7});
    this.changePosition('queen', { x: 3, y: 7});

    this.pawnPosition$.next({ x: 0, y: 6});
    this.changePosition('pawn', { x: 0, y: 6});
    this.pawn2Position$.next({ x: 1, y: 6});
    this.changePosition('pawn2', { x: 1, y: 6});
    this.pawn3Position$.next({ x: 2, y: 6});
    this.changePosition('pawn3', { x: 2, y: 6});
    this.pawn4Position$.next({ x: 3, y: 6});
    this.changePosition('pawn4', { x: 3, y: 6});
    this.pawn5Position$.next({ x: 4, y: 6});
    this.changePosition('pawn5', { x: 4, y: 6});
    this.pawn6Position$.next({ x: 5, y: 6});
    this.changePosition('pawn6', { x: 5, y: 6});
    this.pawn7Position$.next({ x: 6, y: 6});
    this.changePosition('pawn7', { x: 6, y: 6});
    this.pawn8Position$.next({ x: 7, y: 6});
    this.changePosition('pawn8', { x: 7, y: 6});


    this.pawnNPosition$.next({ x: 0, y: 1});
    this.changePosition('pawnN', { x: 0, y: 1});
    this.pawn2NPosition$.next({ x: 1, y: 1});
    this.changePosition('pawn2N', { x: 1, y: 1});
    this.pawn3NPosition$.next({ x: 2, y: 1});
    this.changePosition('pawn3N', { x: 2, y: 1});
    this.pawn4NPosition$.next({ x: 3, y: 1});
    this.changePosition('pawn4N', { x: 3, y: 1});
    this.pawn5NPosition$.next({ x: 4, y: 1});
    this.changePosition('pawn5N', { x: 4, y: 1});
    this.pawn6NPosition$.next({ x: 5, y: 1});
    this.changePosition('pawn6N', { x: 5, y: 1});
    this.pawn7NPosition$.next({ x: 6, y: 1});
    this.changePosition('pawn7N', { x: 6, y: 1});
    this.pawn8NPosition$.next({ x: 7, y: 1});
    this.changePosition('pawn8N', { x: 7, y: 1});

    this.knightNPosition$.next({ x: 1, y: 0});
    this.changePosition('knightN', { x: 1, y: 0});
    this.knight2NPosition$.next({ x: 6, y: 0});
    this.changePosition('knight2N', { x: 6, y: 0});
    this.kingNPosition$.next({ x: 4, y: 0});
    this.changePosition('kingN', { x: 4, y: 0});
    this.rookNPosition$.next({ x: 0, y: 0});
    this.changePosition('rookN', { x: 0, y: 0});
    this.rook2NPosition$.next({ x: 7, y: 0});
    this.changePosition('rook2N', { x: 7, y: 0});
    this.bishopNPosition$.next({ x: 2, y: 0});
    this.changePosition('bishopN', { x: 2, y: 0});
    this.bishop2NPosition$.next({ x: 5, y: 0});
    this.changePosition('bishop2N', { x: 5, y: 0});
    this.queenNPosition$.next({ x: 3, y: 0});
    this.changePosition('queenN', { x: 3, y: 0});


  }


}
