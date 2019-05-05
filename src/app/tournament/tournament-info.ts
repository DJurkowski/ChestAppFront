export class TournamentInfo {
  name: string;
  description: string;
  maxNumberOfUser: number;
  matchTime: number;

  constructor(name: string, description: string, maxNumberOfUser: number, matchTime: number) {
    this.name = name;
    this.description = description;
    this.maxNumberOfUser = maxNumberOfUser;
    this.matchTime = matchTime;
  }
}
