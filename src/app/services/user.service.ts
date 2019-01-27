import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/users`);
  }

  getUsername(userId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + `/username` + `/${userId}`);
  }

  getTournament(tournamentId: number, userId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${userId}` + `/tournament` + `/${tournamentId}`);
  }
}
