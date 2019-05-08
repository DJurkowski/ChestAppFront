import { Friend } from './../friend/friend';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getUserFriends(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/friends`);
  }

  sendInvitation(userId: string, friend: Friend): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${userId}` + `/friend`, friend);
  }

  getListofFriends(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/friendsall`);
  }
}
