import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    if(!this.apiService.currentUser.token) {
      this.router.navigate(['login']);
    }
  }
  ngAfterViewInit(){
    $.getScript("assets/pike-admin/js/pikeadmin.js");
  }
}
