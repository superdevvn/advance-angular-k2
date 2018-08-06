import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  temp: number;
  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.utilityService.x = 5;
    this.utilityService.y = 10;
    //this.temp = this.utilityService.sum(10,15);
    var a = new UtilityService();
    this.temp = a.sum(10,15);
  }
}
