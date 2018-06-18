import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { GridOption } from './controls/grid-control/grid-control.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gridOption: GridOption;
  constructor(private http: Http) {

  }

  ngOnInit() {
    this.gridOption = {
      url: 'http://103.232.121.69:5201/api/getRoles',
      commands: [
        {
          icon: 'fa fa-pencil',
          title: 'Edit',
          click: (item) => {
            console.log(item);
          }
        }
      ],
      columns: [
        {
          field: 'Id',
          title: 'Id',
          type: 'string'
        },
        {
          field: 'Name',
          title: 'Name',
          type: 'string'
        },
        {
          field: 'Description',
          title: 'Description',
          type: 'string'
        }
      ]
    };
  }
}
