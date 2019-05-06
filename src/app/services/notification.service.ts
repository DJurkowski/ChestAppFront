import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './../../app/notifications/notifications/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getNotifications(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/notifications`);
  }

  modifyNotification(userId: string, notiId: number, notification: Notification): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${userId}` + `/notification` + `/${notiId}`, notification);
  }

  deleteNotification(notiId: number, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}` + `/notification` + `/${notiId}`, { responseType: 'text'});

  }
}
