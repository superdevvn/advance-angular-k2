import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router,
    private authService:AuthService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // $('input').iCheck({
    //   checkboxClass: 'icheckbox_square-blue',
    //   radioClass: 'iradio_square-blue',
    //   increaseArea: '20%' // optional
    // });
  }
  login(username: string, password: string) {
    this.authService.login(username,password).then(()=>{
      this.router.navigate(['main']);
    });
  }
}
