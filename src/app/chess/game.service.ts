import { Injectable } from '@angular/core';
import { Coord } from './coord';
import { BehaviorSubject } from 'rxjs';

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

  currentPositions: FigureType [] = new Array<FigureType>();

  knightPosition$ = new BehaviorSubject<Coord>({ x: 1, y: 7});
  knightCurrentPosition: Coord;
  knight2Position$ = new BehaviorSubject<Coord>({ x: 6, y: 7});
  knight2CurrentPosition: Coord;
  kingPosition$ = new BehaviorSubject<Coord>({ x: 4, y: 7});
  kingCurrentPosition: Coord;

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



  constructor() {
    this.kingPosition$.subscribe(kingp => {
      this.kingCurrentPosition = kingp;
    });

    this.knightPosition$.subscribe(knightp => {
      this.knightCurrentPosition = knightp;
    });

    this.knight2Position$.subscribe(knight2p => {
      this.knight2CurrentPosition = knight2p;
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

    this.currentPositions.push( {
      position: this.kingCurrentPosition,
      color: true,
      namefigure: 'king'
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

  }


  moveKnight(to: Coord) {
    this.knightPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'knight') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
    console.log('Kingposition:' + this.kingCurrentPosition);
    console.log('Knightposition:' + this.knightCurrentPosition);
  }

  canMoveKnight(to: Coord) {
    const { x, y } = this.knightCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  }

  moveKnight2(to: Coord) {
    this.knight2Position$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'knight2') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  canMoveKnight2(to: Coord) {
    const { x, y } = this.knight2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  }

  moveKing(to: Coord) {
    this.kingPosition$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'king') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  canMoveKing(to: Coord) {
    const { x, y } = this.kingCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    return (Math.abs(dx) === 1 && Math.abs(dy) === 0) ||
           (Math.abs(dx) === 0 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 1) ;
  }

  movePawn(to: Coord) {

    const { x, y } = this.pawnCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;
    let figure: string;

    if ( (dx === 1 && dy === -1) || (dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) || (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            figure = i.namefigure + 'Position$';
            console.log( 'Figure Kurwo' + figure );
            if (this.unsubscribeFigure(figure)) {
              this.pawnPosition$.next(to);
              for (const j of this.currentPositions) {
                if (j.namefigure === 'pawn') {
                  j.position.x = to.x;
                  j.position.y = to.y;
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
        }
      }
      }
  }

  canMovePawn(to: Coord) {
    const { x, y } = this.pawnCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ( (dx === 1 && dy === -1) || (dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) || (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            return true;
          }
        }
      }
    }
    console.log('Hallo');
    console.log(this.currentPositions);

    return (Math.abs(dx) === 0 && dy === -1) ||
          (Math.abs(dx) === 0 && dy === -2);
  }

  movePawn2(to: Coord) {
    this.pawn2Position$.next(to);
    for (const i of this.currentPositions) {
      if (i.namefigure === 'pawn2') {
        i.position.x = to.x;
        i.position.y = to.y;
      }
    }
  }

  canMovePawn2(to: Coord) {
    const { x, y } = this.pawn2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ( (dx === 1 && dy === -1) || (dx === -1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) || (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
            return true;
          }
        }
      }
    }
    console.log('Hallo');
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

  canMovePawnN(to: Coord) {
    const { x, y } = this.pawnNCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;


    console.log('Hallo');
    console.log(this.currentPositions);

    return (Math.abs(dx) === 0 && dy === 1) ||
          (Math.abs(dx) === 0 && dy === 2);
  }

  unsubscribeFigure (figurename: string) {
    if (figurename === 'pawnNPosition$') {
      this.pawnNPosition$.next({x: -1, y: -1});
      this.pawnNPosition$.unsubscribe();
      return true;
    }
  }

  moveFigure(figurename: string, pos: Coord) {
    switch (figurename) {
      case 'pawn': {
        this.movePawnN(pos);
        break;
      }
    }

  }
}
