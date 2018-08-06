import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private router: Router,
  private apiService: ApiService) { }

  ngOnInit() {
  }
  login(){
    this.apiService.post('api/user/login',{
      username: this.username,
      password: this.password
    }).then(res=>{
      console.log(res);
      this.apiService.saveUser(res);
      this.router.navigate(['main']);
    }).catch(err=>{
      alert(err);
    });
  }
}
