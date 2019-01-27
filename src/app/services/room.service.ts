import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUserRooms(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/user` + `/${userId}` + `/rooms`);
  }

}
