import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  // private baseUrl = 'http://localhost:8080/api/auth';
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  send(mail: string): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/send-mail`, mail);
  }
}
