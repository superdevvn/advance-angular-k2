import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'bootstrap';
import { ApiService } from '../../../common/service/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
  }
}
