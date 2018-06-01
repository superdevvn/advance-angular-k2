import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IGridOption } from '../../controls/grid-control/grid-control.model';

@Component({
  selector: 'app-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.css']
})
export class DemoGridComponent implements OnInit {
  gridOption: IGridOption;
  constructor(private http: Http) { }

  ngOnInit() {

    let edit = (item)=>{
      console.log(item);
    };

    this.gridOption = {
      url: 'http://103.232.121.69:5111/api/getDemos',
      commands: [
        { icon: 'fa fa-edit text-primary', click: edit },
        { icon: 'fa fa-trash text-danger', click: this.remove }],
      columns: [
        { field: 'Code', title: 'Code', width: '100px', type: 'string' },
        { field: 'Name', title: 'Name', width: '', type: 'string' },
        { field: 'Date', title: 'Date', width: '100px', type: 'datetime' },
        { field: 'Salary', title: 'Salary', width: '100px', type: 'string' },
        { field: 'IsDeleted', title: 'IsDeleted', width: '100px', type: 'bool', trueValue: 'Deleted', falseValue: 'Actived' }
      ]
    };

    // let headers = new Headers();
    // headers.append('Auth-SuperDev', 'T7g4AXn3TCQL77zI8QDi16sORDXScffXXgnQ/mE5P38CESS5LXagKECtX5xw0cD+');
    // this.http.post('http://103.232.121.69:5203/api/getUsers', {}, { headers: headers })
    //   .toPromise()
    //   .then(res => {
    //     this.gridOption = {
    //       data: res.json(),
    //       commands: [
    //         { icon: 'fa fa-edit text-primary', click: edit },
    //         { icon: 'fa fa-trash text-danger', click: this.remove }],
    //       columns: [
    //         { field: 'FirstName', title: 'First Name', width: '100px', type: 'string' },
    //         { field: 'LastName', title: 'Last Name', width: '100px', type: 'string' },
    //         { field: 'Username', title: 'Username', width: '', type: 'string' },
    //         { field: 'RoleName', title: 'Role Name', width: '100px', type: 'string' },
    //         { field: 'IsActived', title: 'IsActived', width: '100px', type: 'bool', trueValue: 'Actived', falseValue: 'Blocked' },
    //         { field: 'CreatedDate', title: 'Created Date', width: '100px', type: 'datetime' },
    //       ]
    //     };
    //   });
  }

  remove = (item) =>{
    console.log(item);
  }
}
