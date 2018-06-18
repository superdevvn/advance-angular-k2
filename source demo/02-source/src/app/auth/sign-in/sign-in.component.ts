import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../common/service/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router,
    private authService:AuthService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  login() {
    this.authService.login(this.username,this.password).then(()=>{
      window.location.href = 'main';
    });
  }
}
