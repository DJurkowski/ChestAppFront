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

  lista: Observable<Room[]>;
  username: string;
  constructor(private roomService: RoomService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.lista = this.roomService.getUserRooms(this.username);
  }

}
