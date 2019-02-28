import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../match/match';

@Injectable()
export class MatchService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getMetches(tournamentId: number, userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/tournaments` + `/${tournamentId}` + `/matches`);
  }

  modifyMatch(matchId: number, userId: string, match: Match): Observable<Object> {
    console.log('Jestem w modify Match');
    return this.http.put(`${this.baseUrl}/${userId}` + `/matches` + `/${matchId}`, match);
  }

}