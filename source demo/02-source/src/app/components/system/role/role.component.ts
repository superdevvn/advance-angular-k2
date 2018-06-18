import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOption } from '../../../common/control/grid-control/grid-control.model';
import { ModalControl } from '../../../common/control/modal-control/modal.control';
import { ApiService } from '../../../common/service/api/api.service';
import { NotifyService } from '../../../common/service/notify/notify.service';
import { GridControlComponent } from '../../../common/control/grid-control/grid-control.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  gridOption: GridOption;
  entity: any = {};
  @ViewChild('grid') grid: GridControlComponent;
  @ViewChild('modal') modal: ModalControl;
  constructor(private apiService: ApiService,
    private notifyService: NotifyService) { }

  ngOnInit() {
    this.initGrid();
  }

  initGrid() {
    this.gridOption = new GridOption();
    this.gridOption.component = this;
    this.gridOption.url = '/api/getRoles';
    this.gridOption.commands = [
      {
        icon: 'fa fa-pencil text-primary',
        title: 'Chỉnh sửa',
        click: this.detail
      }
    ];
    this.gridOption.columns = [{
      field: 'Code',
      title: 'Mã vai trò',
      type: 'string',
      width: '150px'
    }, {
      field: 'Name',
      title: 'Vai trò',
      type: 'string',
      width: '200px'
    }, {
      field: 'Description',
      title: 'Ghi chú',
      type: 'string'
    }];
  }

  detail = (item?) => {
    if (item) this.entity = Object.assign({}, item);
    else this.entity = {};
    this.modal.open();
  }

  save() {
    this.apiService.post('/api/saveRole', this.entity).then(res => {
      this.notifyService.success('Save Success');
      this.modal.close();
      this.grid.reload();
    });
  }
}
