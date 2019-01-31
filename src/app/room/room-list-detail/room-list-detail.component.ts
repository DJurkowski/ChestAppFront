import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Stomp} from 'stompjs/lib/stomp.js';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { RoomService } from 'src/app/services/room.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/room/message';

@Component({
  selector: 'app-room-list-detail',
  templateUrl: './room-list-detail.component.html',
  styleUrls: ['./room-list-detail.component.css']
})
export class RoomListDetailComponent implements OnInit {

  @Input() room: Room;
  private stompClient;
  private serverUrl = 'http://localhost:8080/api/auth/socket';
  isHidden = false;
  private messageOut;
  messageList: Observable<Message[]>;

  ngOnInit() {
    this.reloadData();
  }
  constructor(private token: TokenStorageService, private roomService: RoomService) {
    this.initializeWebSocketConnection();
   }

   initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/privateRoom/' + that.room.name, (message) => {
        if (message.body) {
          $('#' + that.room.id).prepend('<div class=\'alert alert-secondary flex-wrap\'>' + message.body + '</div>' );
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.messageOut = '@' + this.token.getUsername() + ': ' + message ;
    this.stompClient.send('/api/' + this.room.name, {}, this.messageOut);
    $('#input' + this.room.id).val('');
  }

  hideDiv() {
    this.isHidden = !this.isHidden;
  }

  reloadData() {
    this.messageList = this.roomService.getMessages(this.room.name);
  }

}
