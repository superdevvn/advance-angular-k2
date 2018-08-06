import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ApiService } from '../services/api.service';
import { GridOption } from '../controls/grid-control/grid-control.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  items: any[] = [];
  gridOption: GridOption;
  constructor(private utilityService: UtilityService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.gridOption = new GridOption();
    this.gridOption.url = 'api/role/list';
    this.gridOption.component = this;
    this.gridOption.columns = [{
      field: 'Name',
      title: 'Tên',
      type: 'string',
      width: '200px'
    },
    {
      field: 'Description',
      title: 'Description',
      type: 'string'
    }]
    //console.log(this.utilityService.sum(this.utilityService.x, this.utilityService.y));
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
