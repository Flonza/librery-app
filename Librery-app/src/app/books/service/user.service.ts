import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVI_DEV } from '../../../environments/environments.dev';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = ENVI_DEV.URL;
  private jwt = this.cookies.get("jwt")

  constructor(private http:HttpClient, private cookies:CookieService) { }

  getData(frag:any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`);
    return this.http.get(`${this.URL}/${frag}`, {headers})
  }
}
