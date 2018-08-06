import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  items: any[] = [];
  constructor(private utilityService: UtilityService,
    private apiService: ApiService) { }

  ngOnInit() {
    console.log(this.utilityService.sum(this.utilityService.x, this.utilityService.y));
    // this.apiService.post('http://api.serverapi.host/api/v1/apiv3/GetDistricts', {
    //   "token": "TokenStaging"
    // }).then((res:any) => {
    //   this.items = res.data;
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  }

}
