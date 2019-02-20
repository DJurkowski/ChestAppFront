import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MatchService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getMetches(tournamentId: number, userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/tournaments` + `/${tournamentId}` + `/matches`);
  }

}
