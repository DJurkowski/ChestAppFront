export class Match {
  id: number;
  name: string;
  userOneId: number;
  userTwoId: number;
  // start = true, finish = false -> powinien byc enum czy cos
  status: string;
  // true = show, false = hide
  showMatch: boolean;
  // dodac jeszcze kto wgral rozgrywke
  whoWon: number;
}
