export class TournamentInfo {
  name: string;
  description: string;
  maxNumberOfUser: number;
  matchTime: number;
  startDate: Date;
  endDate: Date;

  constructor(name: string, description: string, maxNumberOfUser: number, matchTime: number, startDate: Date, endDate: Date) {
    this.name = name;
    this.description = description;
    this.maxNumberOfUser = maxNumberOfUser;
    this.matchTime = matchTime;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
