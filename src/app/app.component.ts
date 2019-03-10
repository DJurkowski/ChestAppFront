import * as SockJS from 'sockjs-client';
import { TokenStorageService } from './auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Stomp} from 'stompjs/lib/stomp.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  public authority: string;

  public username: string;
  public notifications = false;

  private stompClient;
  private serverUrl = 'http://localhost:8080/api/auth/socket';

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        this.username = this.tokenStorage.getUsername();
        this.initializeWebSocketConnection();
        return true;
      });
    }
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/notification/' + that.username, (message) => {
        if (message.body) {
          console.log('Dostalem message taki bo tak : ' + message.body);
          // that.opponentMove(message.body);
          if (message.body === 'notifi') {
            that.notifications = true;
          }
        }
      });
    });
  }

  turnOffNotification() {
    if (this.notifications === true) {
      this.notifications = false;
    }
  }

}
