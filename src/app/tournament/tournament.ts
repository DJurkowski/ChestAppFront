import { Match } from '../match/match';
import { User } from '../user/user';

export class Tournament {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  minValueOfRankValue: number;
  maxNumberOfUser: number;
  numberOfUser: number;
  masterUser: number;
  status: string;
  matchTime: number;
  users: Array<User>;
}
