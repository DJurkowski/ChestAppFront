import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Stomp} from 'stompjs/lib/stomp.js';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  globalMessage: string;
  globalMessageUpdate: Observable<string>;
  globalMessageObserver: Observer<string>;

  globalNotification: string;
  globalNotificationUpdate: Observable<string>;
  globalNotificationObserver: Observer<string>;

  globalGame: string;
  globalGameUpdate: Observable<string>;
  globalGameObserver: Observer<string>;

  private messageOut;

  private stompClient;
  private serverUrl = 'http://localhost:8080/api/auth/socket';

  constructor() {
    this.globalMessageUpdate = Observable.create((observer: Observer<string>) => {
      this.globalMessageObserver = observer;
    });
    this.globalNotificationUpdate = Observable.create((observer: Observer<string>) => {
      this.globalNotificationObserver = observer;
    });
    this.globalGameUpdate = Observable.create((observer: Observer<string>) => {
      this.globalGameObserver = observer;
    });
  }

  updateGlobalMessage(message: string) {
    this.globalMessage = message;
    this.globalMessageObserver.next(this.globalMessage);
  }

  updateGlobalNotification(message: string) {
    this.globalNotification = message;
    this.globalNotificationObserver.next(this.globalNotification);
  }

  updateGlobalGame(message: string) {
    this.globalNotification = message;
    this.globalNotificationObserver.next(this.globalNotification);
  }

  getMessage(): Observable<string> {
    return this.globalMessageUpdate;
  }


  initializeWebSocket(username) {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/privateMessage/' + username, (message) => {
        if (message.body) {
          const messageTab = message.body.split(';', 5);
          console.log('To mi wyskoczylo z message.body ' + messageTab[0]);
          switch (messageTab[0]) {
            case 'chat': {
              console.log('JestemW Switch Chat!!!');
              that.updateGlobalMessage(message.body);
              break;
            }
            case 'noti': {
              console.log('JestemW Switch Noti!!!');
              that.updateGlobalNotification(message.body);
              break;
            }
            case 'game': {
            console.log('JestemW Switch Noti!!!');
              that.updateGlobalGame(message.body);
              break;
            }
          }
          console.log('Dostalem message taki bo tak : ' + message.body);
          // that.opponentMove(message.body);
          // that.updateGlobalMessage(message.body);
        }
      });
    });
  }

  sendMessage(functions, roomName, userFrom, userTo, message) {
    this.messageOut = functions + ';' + roomName + ';' + userFrom + ';' + userTo + ';' + message;
    this.stompClient.send('/api/websocket/' + userTo, {}, this.messageOut);
  }

  closeConnection() {
    this.stompClient.disconnect();
    console.log('Closing connection!');
  }


}
