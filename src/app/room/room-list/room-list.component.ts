import { RoomService } from './../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  // lista: Observable<Room[]>;
  lista: Room[] = [
    {
      id: 1,
      name: 'room1',
      userOneId: 'dom1',
      userTwoId: 'domo'
    },
    {
      id: 2,
      name: 'room2',
      userOneId: '1',
      userTwoId: '2'
    },
    {
      id: 3,
      name: 'room3',
      userOneId: '1',
      userTwoId: '2'
    }
];
  username: string;
  constructor(private roomService: RoomService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    // this.lista = this.roomService.getUserRooms(this.username);
  }

}
