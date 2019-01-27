export class TournamentInfo {
  name: string;
  description: string;
  minValueOfRankValue: number;
  maxNumberOfUser: number;

  constructor(name: string, description: string, minValueOfRankValue: number, maxNumberOfUser: number) {
    this.name = name;
    this.description = description;
    this.minValueOfRankValue = minValueOfRankValue;
    this.maxNumberOfUser = maxNumberOfUser;
  }
}
