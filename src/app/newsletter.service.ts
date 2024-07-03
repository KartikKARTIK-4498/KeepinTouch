import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'https://api.sendinblue.com/v3/contacts';
  private apiKey = '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';

  constructor(private http: HttpClient) { }

  subscribe(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json', 
      'Content-Type': 'application/json',
      'api-key': this.apiKey
    });

    const body = {
      email: email,
      listIds: [2] // Replace with your list ID
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
