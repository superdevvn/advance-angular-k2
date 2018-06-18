import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { NotifyService } from './notify.service';

@Injectable()
export class ApiService {
  host: string = 'http://localhost:64324/';
  constructor(private http: Http,
    private router: Router,
    private notifyService: NotifyService) {
  }
  post(url: string, data: any) {
    let token = localStorage.getItem('Auth-SuperDev') || '';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Auth-SuperDev', token);
    return new Promise<Response>((resolve, reject) => {
      this.http.post(this.host + url, data, { headers })
        .toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          // Log url và data gây ra lỗi
          console.error({ url, data });
          // Kiểm tra có phải lỗi do server trả về hay không
          if (err.json) {
            // Kiểm tra lỗi server trả về có message hay không
            if (err.json() && err.json().message) {
              let message = err.json().message;

              // Thông báo lỗi
              this.notifyService.error(message);
            } else {
              // Log error
              console.error(err.json());
            }
          } else {
            // Thông báo lỗi
            this.notifyService.error(`[ERROR_API] ${url}`);
          }
          reject(err);
        });
    });
  }
}
