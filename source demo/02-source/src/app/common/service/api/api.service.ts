import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { NotifyService } from '.././notify/notify.service';
import { User } from './api.model';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class ApiService {
  currentUser: User = {
    token: 'NONE',
    firstName: '',
    lastName: '',
    fullName: '',
    userName: ''
  };
  host: string = 'http://localhost:64324';
  constructor(private http: Http,
    private router: Router,
    private notifyService: NotifyService,
    private utilityService: UtilityService) {
    if (localStorage.getItem(location.host)) {
      try {
        this.currentUser = JSON.parse(localStorage.getItem(location.host));
      } catch{
        this.currentUser = {
          token: 'NONE',
          firstName: '',
          lastName: '',
          fullName: '',
          userName: ''
        }
      }

    };
  }
  post(url: string, data: any) {
    let token = '';
    if (this.currentUser) token = this.currentUser.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Auth-SuperDev', token);
    return new Promise<Response>((resolve, reject) => {
      this.http.post(this.host + url, data, { headers }).toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          // Log url và data gây ra lỗi
          console.error({ url, data });
          this.utilityService.handleError(err);
          //reject(err);
        });
    });
  }

  get(url: string) {
    let token = '';
    if (this.currentUser) token = this.currentUser.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Auth-SuperDev', token);
    return new Promise<Response>((resolve, reject) => {
      this.http.get(this.host + url, { headers }).toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          // Log url gây ra lỗi
          console.error(url);
          // Kiểm tra có phải lỗi do server trả về hay không
          if (err.json) {
            // Kiểm tra lỗi server trả về có message hay không
            if (err.json().message) {
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

  delete(url: string) {
    let token = '';
    if (this.currentUser) token = this.currentUser.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Auth-SuperDev', token);
    return new Promise<Response>((resolve, reject) => {
      this.http.delete(this.host + url, { headers }).toPromise()
        .then(res => {
          resolve(res);
        }).catch(err => {
          // Log url gây ra lỗi
          console.error(url);
          // Kiểm tra có phải lỗi do server trả về hay không
          if (err.json) {
            // Kiểm tra lỗi server trả về có message hay không
            if (err.json().message) {
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
