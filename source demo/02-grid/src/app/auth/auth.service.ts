import { Injectable } from '@angular/core';
import { ApiService } from '../common/service/api.service';

@Injectable()
export class AuthService {

  constructor(private apiService: ApiService) { }
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.apiService.post('api/login', { username, password }).then(res => {
        localStorage.setItem('Auth-SuperDev', res.json());
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  }
}
