export class Room {
  id: number;
  name: string;
  userOneId: string;
  userTwoId: string;

  constructor(id: number, name: string, userOneId: string, userTwoId: string) {
    this.id = id;
    this.name = name;
    this.userOneId = userOneId;
    this.userTwoId = userTwoId;
  }
}
