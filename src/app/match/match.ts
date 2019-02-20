export class Match {
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
}
