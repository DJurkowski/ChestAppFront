import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Stomp} from 'stompjs/lib/stomp.js';
import SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-room-list-detail',
  templateUrl: './room-list-detail.component.html',
  styleUrls: ['./room-list-detail.component.css']
})
export class RoomListDetailComponent implements OnInit {

  @Input() room: Room;
  private stompClient;
  private serverUrl = 'http://localhost:8080/socket';
  isHidden = false;

  ngOnInit() {
  }
  constructor(private token: TokenStorageService) {
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
    this.stompClient.send('/app/' + this.room.name, {}, message);
    $('#input' + this.room.id).val('');
  }

  hideDiv() {
    this.isHidden = !this.isHidden;
  }

}
