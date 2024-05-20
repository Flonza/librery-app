import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private notyf: any;

  constructor(@Inject(DOCUMENT) private document: Document, private cookie:CookieService) {
  }

  processResponse(resp: any) {

    if(this.document == undefined){
      return
    }

    const { message, statusCode, severity } = resp;
    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: 'center',
        y: 'top',
      },
      types: [
        {
          type: 'warning',
          background: 'orange',
          dismissible: true,
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'warning',
            color: 'white'
          }
        },
        {
          type: 'error',
          background: 'indianred',
          dismissible: true,
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'error',
            color: 'white'
          }
        },
        {
          type: 'success',
          dismissible: true,
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'check_circle',
            color: 'white'
          }
        },
        {
          type: 'info',
          dismissible: false,
          background: '#5F89DC',
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'info',
            color: 'white'
          }
        }
      ]
    });

    if (statusCode >= 400 && statusCode < 500) {
      this.notyf.open({
        type: 'warning',
        message: message
      });
      if(message === "The token is not valid"){
        this.cookie.delete("jwt")
      }
    } else if (statusCode === 500) {
      this.notyf.open({
        type: 'error',
        message: message
      });
    } else if (statusCode === 200) {
      this.notyf.open({
        type: severity,
        message: message
      });
    } else if(statusCode === 0) {
      this.notyf.open(
        {
          type: 'info',
          message: message
        }
      )
    } else {
      return
    }
  }
}
