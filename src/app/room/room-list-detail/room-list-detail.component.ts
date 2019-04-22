import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import $ from 'jquery';
import { RoomService } from 'src/app/services/room.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/room/message';
import { WebSocketService } from 'src/app/globalService/web-socket.service';

@Component({
  selector: 'app-room-list-detail',
  templateUrl: './room-list-detail.component.html',
  styleUrls: ['./room-list-detail.component.css']
})
export class RoomListDetailComponent implements OnInit {

  @Input() room: Room;

  username: string;

  isHidden = false;
  messageList: Observable<Message[]>;

  public setRoom() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.reloadData();
    console.log('On init: ' + this.room.name);
    this.initializeWebSocketConnection();
  }
  constructor(private tokenStorage: TokenStorageService, private roomService: RoomService, private webSocketService: WebSocketService) {
    // console.log(this.room);
    this.username = this.tokenStorage.getUsername();
    this.initializeWebSocketConnection();
   }

   initializeWebSocketConnection() {
    this.webSocketService.globalMessageUpdate.subscribe((data) => {
      console.log('Jestem ChatRoom.....');
      const messageTab = data.split(';', 5);
      console.log( 'messageTab: ');
      if (messageTab[0] === 'chat') {
        console.log(' Jestem 1 ChatRoom : ' + messageTab[1] + ' room.name : ' + this.room.name);
        if (messageTab[1] === this.room.name) {
          console.log('Jestem 2 ' + this.room.name + ' UserName: ' + messageTab[2]);
          if (this.username !== messageTab[2]) {
            console.log('Powinno wyswietlic');
            $('#' + this.room.id).prepend('<div class=\'alert alert-secondary flex-wrap\'>' + messageTab[4] + '</div>' );
          }
        }
      }
    });
  }

  sendMessage(message) {
    if ( this.username !== this.room.user1Id) {
      this.webSocketService.sendMessage('chat', this.room.name, this.username , this.room.user1Id, message);
    } else {
      this.webSocketService.sendMessage('chat', this.room.name, this.username , this.room.user2Id, message);
    }
    // tslint:disable-next-line:max-line-length
    $('#' + this.room.id).prepend('<div class=\'alert alert-secondary flex-wrap\' style=\'background-color:#428bca;color:white\'>' + '@' + this.username + ' : ' + message + '</div>' );
    $('#input' + this.room.id).val('');
  }

  hideDiv() {
    this.isHidden = !this.isHidden;
    if (this.isHidden) {
      this.setRoom();
    }
  }

  reloadData() {
    this.messageList = this.roomService.getMessages(this.room.name);
  }

}
