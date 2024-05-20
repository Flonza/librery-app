import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVI_DEV } from '../../../environments/environments.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private URL = ENVI_DEV.URL
  constructor(private http:HttpClient) { }

  getInfo(fragment: string, data: any): Observable<any> {
    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }
    return this.http.get<any>(`${this.URL}${fragment}`, { params });
  }
}


