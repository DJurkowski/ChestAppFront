import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getNotifications(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/notifications`);
  }

}
