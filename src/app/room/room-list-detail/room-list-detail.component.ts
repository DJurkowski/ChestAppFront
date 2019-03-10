import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Stomp} from 'stompjs/lib/stomp.js';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { RoomService } from 'src/app/services/room.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/room/message';
import { WebSocketService } from 'src/app/globalService/web-socket.service';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-room-list-detail',
  templateUrl: './room-list-detail.component.html',
  styleUrls: ['./room-list-detail.component.css']
})
export class RoomListDetailComponent implements OnInit {

  @Input() room: Room;

  username: string;

  private stompClient;
  private serverUrl = 'http://localhost:8080/api/auth/socket';

  isHidden = false;
  private messageOut;
  messageList: Observable<Message[]>;

  ngOnInit() {
    this.reloadData();
    console.log('On init: ' + this.room.name);
    // this.webSocketService.initializeWebSocket(this.username);
  }
  constructor(private tokenStorage: TokenStorageService, private roomService: RoomService, private webSocketService: WebSocketService) {
    // console.log(this.room);
    this.username = this.tokenStorage.getUsername();
    this.initializeWebSocketConnection();
   }

   initializeWebSocketConnection() {
    // const ws = new SockJS(this.serverUrl);
    // this.stompClient = Stomp.over(ws);
    // const that = this;
    // this.stompClient.connect({}, function(frame) {
    //   that.stompClient.subscribe('/privateRoom/' + that.room.name, (message) => {
    //     if (message.body) {
    //       $('#' + that.room.id).prepend('<div class=\'alert alert-secondary flex-wrap\'>' + message.body + '</div>' );
    //       console.log(message.body);
    //     }
    //   });
    // });
    // console.log('Pokaz to kurwa undefine: ' + this.room.name);

    this.webSocketService.globalMessageUpdate.subscribe((data) => {
      console.log('Jestem ChatRoom.....');
      const messageTab = data.split(';', 5);
      if (messageTab[0] === 'chat') {
        if (messageTab[1] === this.room.name) {
          if (this.username !== messageTab[2]) {
            $('#' + this.room.id).prepend('<div class=\'alert alert-secondary flex-wrap\'>' + messageTab[4] + '</div>' );
          }
        }
      }
    });
  }

  sendMessage(message) {
    // this.messageOut = '@' + this.token.getUsername() + ': ' + message ;
    // this.stompClient.send('/api/' + this.room.name, {}, this.messageOut);
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
  }

  reloadData() {
    this.messageList = this.roomService.getMessages(this.room.name);
  }

}
