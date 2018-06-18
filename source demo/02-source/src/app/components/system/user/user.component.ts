import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOption } from '../../../common/control/grid-control/grid-control.model';
import { ModalControl } from '../../../common/control/modal-control/modal.control';
import { ApiService } from '../../../common/service/api/api.service';
import { NotifyService } from '../../../common/service/notify/notify.service';
import { GridControlComponent } from '../../../common/control/grid-control/grid-control.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  gridOption: GridOption;
  entity: any = {};
  roles: any[] = [];
  @ViewChild('grid') grid: GridControlComponent;
  @ViewChild('modal') modal: ModalControl;
  constructor(private apiService: ApiService,
    private notifyService: NotifyService) { }

  ngOnInit() {
    this.initGrid();
    this.getRoles();
  }

  initGrid() {
    this.gridOption = new GridOption();
    this.gridOption.component = this;
    this.gridOption.url = '/api/getUsers';
    this.gridOption.commands = [
      {
        icon: 'fa fa-pencil text-primary',
        title: 'Chỉnh sửa',
        click: this.detail
      }
    ];
    this.gridOption.columns = [{
      field: 'FirstName',
      title: 'First Name',
      type: 'string',
      width: '120px'
    }, {
      field: 'LastName',
      title: 'Last Name',
      type: 'string',
      width: '120px'
    }, {
      field: 'Username',
      title: 'Username',
      type: 'string',
      width: '120px'
    }, {
      field: 'RoleName',
      title: 'Role',
      type: 'string',
      width: '120px'
    }, {
      field: 'Description',
      title: 'Description',
      type: 'string'
    }];
  }

  getRoles(){
    this.apiService.post('/api/allRoles', {}).then(res => {
      this.roles = res.json();
    });
  }

  detail = (item?) => {
    if (item) this.entity = Object.assign({}, item);
    else this.entity = {};
    this.modal.open();
  }

  save() {
    this.apiService.post('/api/saveUser', this.entity).then(res => {
      this.notifyService.success('Save Success');
      this.modal.close();
      this.grid.reload();
    });
  }

}
