export class TournamentInfo {
  name: string;
  description: string;
  maxNumberOfUser: number;

  constructor(name: string, description: string, maxNumberOfUser: number) {
    this.name = name;
    this.description = description;
    this.maxNumberOfUser = maxNumberOfUser;
  }
}
