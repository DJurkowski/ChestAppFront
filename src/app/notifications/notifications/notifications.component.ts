import { TokenStorageService } from './../../auth/token-storage.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification} from './../../notifications/notifications/notification';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationList: Observable<Notification[]>;
  notiList: Array<Notification> = new Array<Notification>();
  username: string;

  constructor(private notificationService: NotificationService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.notiList = [];
    this.notificationList = this.notificationService.getNotifications(this.username);
    this.notificationList.forEach(data => {
      data.forEach( xdata => {
        this.notiList.push ( xdata );
      });
    });
  }

  seenFunction(id: number) {
    for (const i of this.notiList) {
      if (i.id === id) {
        i.seen = !i.seen;
        this.notificationService.modifyNotification(this.username, i.id, i).subscribe(
          data => {
            this.reloadData();
          }
        );
      }
    }
  }

  deleteNotification(id: number) {
    for (const i of this.notiList) {
      if ( i.id === id) {
        // console.log('Jestem !!');
        this.notificationService.deleteNotification(id, this.username).subscribe(
          data => {
            this.reloadData();
          }
          );
       }
    }
  }

}
