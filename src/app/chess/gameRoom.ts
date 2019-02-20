export class GameRoom {
  id: number;
  name: string;
  userOneId: string;
  userTwoId: string;
  // start = true, finish = false -> powinien byc enum czy cos
  status: string;
  // true = show, false = hide
  show: boolean;
  // dodac jeszcze kto wgral rozgrywke
  whoWon: string;

  constructor(id: number, name: string, userOneId: string, userTwoId: string) {
    this.id = id;
    this.name = name;
    this.userOneId = userOneId;
    this.userTwoId = userTwoId;
  }
}
