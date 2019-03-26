import { Injectable } from '@angular/core';
import { Coord } from './coord';
import { BehaviorSubject, Observable } from 'rxjs';

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

  userPointsObservable = new BehaviorSubject<Number>(0);
  actualUserPoints: Number;

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


  constructor() {

    this.actualUserPoints = 0;

    this.userPointsObservable.subscribe((points) => {
      this.actualUserPoints = points;
    });

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

    }
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

    const { x, y } = this.kingCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (dx === -1 && dy === 1) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x - 1) && i.position.y === (y + 1)) ) {
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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

  movePawn(to: Coord) {

    const { x, y } = this.pawnCurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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

    // if ( (dx === 1 && dy === -1) || (dx === -1 && dy === -1)) {
    //   for ( const i of this.currentPositions) {
    //     if (!i.color) {
    //       if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) || (i.position.x === (x - 1) && i.position.y === (y - 1)) ) {
    //         if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
    //           this.pawnPosition$.next(to);
    //           for (const j of this.currentPositions) {
    //             if (j.namefigure === 'pawn') {
    //               j.position.x = to.x;
    //               j.position.y = to.y;
    //               return true;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // } else {
    //     this.pawnPosition$.next(to);
    //     for (const i of this.currentPositions) {
    //       if (i.namefigure === 'pawn') {
    //         i.position.x = to.x;
    //         i.position.y = to.y;
    //         return false;
    //       }
    //     }
    //   }
  }

  movePawn2(to: Coord) {

    const { x, y } = this.pawn2CurrentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if ((dx === 1 && dy === -1)) {
      for ( const i of this.currentPositions) {
        if (!i.color) {
          if ( (i.position.x === (x + 1) && i.position.y === (y - 1)) ) {
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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
            if (this.unsubscribeFigure(i.namefigure + 'Position$')) {
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


  unsubscribeFigure (figurename: string) {

    switch (figurename) {

      case 'kingPosition$': {
        this.kingPosition$.next({x: -1, y: -1});
        this.kingPosition$.unsubscribe();
        this.scorePointsUser(5, 'sub');
        return true;
      }

      case 'knightPosition$': {
        this.knightPosition$.next({x: -1, y: -1});
        this.knightPosition$.unsubscribe();
        this.scorePointsUser(3, 'sub');
        return true;
      }

      case 'knight2Position$': {
        this.knight2Position$.next({x: -1, y: -1});
        this.knight2Position$.unsubscribe();
        this.scorePointsUser(3, 'sub');
        return true;
      }

      case 'pawnPosition$': {
        this.pawnPosition$.next({x: -1, y: -1});
        this.pawnPosition$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn2Position$': {
        this.pawn2Position$.next({x: -1, y: -1});
        this.pawn2Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn3Position$': {
        this.pawn3Position$.next({x: -1, y: -1});
        this.pawn3Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn4Position$': {
        this.pawn4Position$.next({x: -1, y: -1});
        this.pawn4Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn5Position$': {
        this.pawn5Position$.next({x: -1, y: -1});
        this.pawn5Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn6Position$': {
        this.pawn6Position$.next({x: -1, y: -1});
        this.pawn6Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn7Position$': {
        this.pawn7Position$.next({x: -1, y: -1});
        this.pawn7Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      case 'pawn8Position$': {
        this.pawn8Position$.next({x: -1, y: -1});
        this.pawn8Position$.unsubscribe();
        this.scorePointsUser(1, 'sub');
        return true;
      }

      // Negative
      case 'pawnNPosition$': {
        this.pawnNPosition$.next({x: -1, y: -1});
        this.pawnNPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn2NPosition$': {
        this.pawn2NPosition$.next({x: -1, y: -1});
        this.pawn2NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn3NPosition$': {
        this.pawn3NPosition$.next({x: -1, y: -1});
        this.pawn3NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn4NPosition$': {
        this.pawn4NPosition$.next({x: -1, y: -1});
        this.pawn4NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn5NPosition$': {
        this.pawn5NPosition$.next({x: -1, y: -1});
        this.pawn5NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn6NPosition$':
      this.pawn6NPosition$.next({x: -1, y: -1});
      this.pawn6NPosition$.unsubscribe();
      this.scorePointsUser(1, 'add');
      return true;

      case 'pawn7NPosition$': {
        this.pawn7NPosition$.next({x: -1, y: -1});
        this.pawn7NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'pawn8NPosition$': {
        this.pawn8NPosition$.next({x: -1, y: -1});
        this.pawn8NPosition$.unsubscribe();
        this.scorePointsUser(1, 'add');
        return true;
      }

      case 'kingNPosition$': {
        this.kingNPosition$.next({x: -1, y: -1});
        this.kingNPosition$.unsubscribe();
        this.scorePointsUser(5, 'add');
        return true;
      }

      default:
        return false;
    }

  }

  moveFigure(figurename: string, pos: Coord, capture: boolean) {
    if (capture) {
      for ( const i of this.currentPositions) {
        if (i.color) {
          if ((i.position.x === pos.x && i.position.y === pos.y)) {
            this.unsubscribeFigure(i.namefigure + 'Position$');
              i.position.x = -1;
              i.position.y = -1;
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

}
