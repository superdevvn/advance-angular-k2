import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
  
  constructor(private apiService: ApiService) {
    
  }
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.apiService.post('/api/login', { username, password }).then(res => {
        this.apiService.currentUser = res.json();
        localStorage.setItem(location.host, JSON.stringify(this.apiService.currentUser));
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  }
}
