import { User } from '../../app/user/user';

export class Match {
  id: number;
  name: string;
  userOneId: number;
  userTwoId: number;
  userOneUsername: string;
  userTwoUsername: string;
  userOneReady: boolean;
  userTwoReady: boolean;
  userOneMoves: number;
  userTwoMoves: number;
  userOneRoundsTime: number;
  userTwoRoundsTime: number;
  // start = true, finish = false -> powinien byc enum czy cos
  status: string;
  // true = show, false = hide
  showMatch: boolean;
  // dodac jeszcze kto wgral rozgrywke
  whoWon: number;
  startGameUser: number;
  matchTime: number;
  users: Array<User>;
}
