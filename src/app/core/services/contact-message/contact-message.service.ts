import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirnment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  apiBaseUrl = `${envirnment.apiUrl}/ContactMessages`
  constructor(private http: HttpClient) { }

  submitMessage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/submit-message`, formData);
  }

  getMyMessages(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/get-my-message`);
  }

  getAllMessages(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/get-all-messages`);
  }

  replayOnMessage(messageId: number | null, replyText: string): Observable<any> {

    return this.http.post(`${this.apiBaseUrl}/reply-on-message/` + messageId,
      JSON.stringify(replyText), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  removeMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/remove-message/` + messageId);
  }
}
