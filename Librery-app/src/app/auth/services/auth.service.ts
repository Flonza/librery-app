import { Injectable } from '@angular/core';
import { ENVI_DEV } from '../../../environments/environments.dev';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../util/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = ENVI_DEV.URL
  private isLogged = new BehaviorSubject<boolean>(false)

  constructor(private http:HttpClient, private cookies:CookieService) {

  }
  isLoggedIn(): Observable<boolean> {
    return this.isLogged
  }
  // Método para cambiar el estado de inicio de sesión
  setLoggedIn(value: boolean): void {
    this.isLogged.next(value);
  }
  sendData(val: any, segment: string):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.url + segment, val);
  }

  setCookieValue(val:string){
    const now = new Date();
    now.setTime(now.getTime() + (30 * 60 * 1000));
    return this.cookies.set("jwt", val, { expires: now, path: '/' });
  }
}
