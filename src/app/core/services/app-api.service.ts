import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../enviroments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  private apiUrl = 'https://api.thedogapi.com/v1/images/search';
  private apiKey = 'live_xZIcFZK2VuErcxzg4AKVtgT6lh6wOTizC0eLzd5qhLjP6g6bGpfy1BSpMa5FACQu';
  private headers = new HttpHeaders({
    'x-api-key': this.apiKey
  });

  constructor(private http: HttpClient) { }

  getDogImages(limit: number, page: number): Observable<any[]> {
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('has_breeds', '1')
      .set('page', String(page));

    return this.http.get<any[]>(this.apiUrl, { headers: this.headers, params });
  }
}
