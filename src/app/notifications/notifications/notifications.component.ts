import { TokenStorageService } from './../../auth/token-storage.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from './notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationList: Observable<Notification[]>;
  username: string;

  constructor(private notificationService: NotificationService, private token: TokenStorageService) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    this.reloadData();
  }

  reloadData() {
    this.notificationList = this.notificationService.getNotifications(this.username);
  }

}
