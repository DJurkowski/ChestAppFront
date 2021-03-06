import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../tournament/tournament';

@Injectable()
export class TournamentService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  createTournament(tournament: Object, userId: string): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${userId}` + `/tournaments`, tournament);
  }

  getTournament(tournamentId: number, userId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/tournament` + `/${tournamentId}`);
  }

  getUserTournaments(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/usertournaments`);
  }

  getTournaments(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/tournaments`);
  }

  getAllTournaments(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/alltournaments`);
  }

  deleteTournament(tournamentId: number, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}` + `/tournaments/${tournamentId}`, { responseType: 'text'});

  }

  addUserToTournament(tournamentId: number, userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}` + `/tournaments/${tournamentId}`, tournamentId);
  }

  modifyTournament(userId: string, tournamentId: number, tournament: Tournament): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${userId}` + `/tournaments` + `/${tournamentId}`, tournament);
  }

}
