import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueueEntry, NowServingMap, QueueType } from '../type/queue';

@Injectable({
  providedIn: 'root'
})
export class Sample {
  private readonly baseUrl = 'http://localhost:3000/api/queue';

  constructor(private http: HttpClient) {}

  getQueue(): Observable<QueueEntry[]> {
    return this.http.get<QueueEntry[]>(this.baseUrl);
  }

  addToQueue(entry: QueueEntry): Observable<any> {
    return this.http.post(this.baseUrl, entry);
  }

  markAsServed(number: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${number}/serve`, {});
  }

  setNowServing(entry: QueueEntry | { number: string | null; type: QueueType }): Observable<any> {
    return this.http.post(`${this.baseUrl}/now-serving`, entry);
  }

  getNowServing(): Observable<NowServingMap> {
    return this.http.get<NowServingMap>(`${this.baseUrl}/now-serving`);
  }

  getHistory(): Observable<QueueEntry[]> {
  return this.http.get<QueueEntry[]>(`${this.baseUrl}/history`);
}

  getStats(): Observable<any> {
  return this.http.get(`${this.baseUrl}/stats`);
}

}
