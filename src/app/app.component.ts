import { TokenStorageService } from './auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './globalService/web-socket.service';

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

  public isDisabled = false;

  constructor(private tokenStorage: TokenStorageService, private webSocketService: WebSocketService) {
    this.initializeWebSocketConnection();
    this.initializeUserAvailable();
  }

  ngOnInit(): void {
    console.log('AppHomeNgOnInit!!!!!!!!');
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
        this.webSocketService.initializeWebSocket(this.username);
        return true;
      });
    }
  }

  initializeWebSocketConnection() {
    this.webSocketService.globalNotificationUpdate.subscribe((data) => {
      const messageTab = data.split(';', 5);
      if (messageTab[0] === 'noti') {
        if (messageTab[3] === this.username) {
          this.notifications = true;
        }
      }
    });
  }

  initializeUserAvailable() {
    this.webSocketService.userAvailableUpdate.subscribe((data) => {
      console.log( 'User available valueOf : ' + data.valueOf());
      console.log( 'User available : ' + data);
      if (data) {
        this.isDisabled = true;
      } else if (!data) {
        this.isDisabled = false;
      }
    });
  }

  turnOffNotification() {
    if (this.notifications === true) {
      this.notifications = false;
    }
  }

}
