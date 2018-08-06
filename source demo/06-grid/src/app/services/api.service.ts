import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host: string = 'https://superdev-qlbh.azurewebsites.net/';
  currentUser: any;
  constructor(private http: Http) {
    this.loadUser();
  }

  post(url: string, data: any) {
    let headers = new Headers();
    headers.append('token', this.currentUser.token || '');
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.host + url, data, { headers: headers }).toPromise().then(res => {
        resolve(res.json());
      }).catch(err => {
        if (typeof (err) === 'string') reject(err);
        else if (typeof (err) === 'object' && err.json && typeof (err.json().Message) === 'string') reject(err.json().Message);
        else {
          console.error(err);
          reject('UNKNOWN_ERROR');
        }
      });
    });
    return promise;
    //return this.http.post(this.host + url,data).toPromise();
  }

  saveUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('260f3688-1dae-4b43-9581-95474f619b86', JSON.stringify(this.currentUser));
  }

  loadUser() {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('260f3688-1dae-4b43-9581-95474f619b86')) || {};
    } catch{
      this.currentUser = {};
    }
  }
}
