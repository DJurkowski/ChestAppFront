import { RoomService } from './../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  lista: Observable<Room[]>;
  username: string;

  isHidden = false;
  isOpened: number;

  constructor(private roomService: RoomService, private token: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.username = this.token.getUsername();
      this.reloadData();
    } else {
      this.router.navigate(['home']);
    }
  }

  reloadData() {
    this.lista = this.roomService.getUserRooms(this.username);
  }

  hideDiv(digit: number) {
    this.isHidden = !this.isHidden;
    if (this.isOpened === digit) {
      this.isOpened = 0;
    } else {
      this.isOpened = digit;
    }
  }
}
