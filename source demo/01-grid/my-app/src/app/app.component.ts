import { Component } from '@angular/core';
import { IGridOption } from './grid-control/grid-control.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gridOption: IGridOption;
  constructor(){
    this.gridOption = {
      items: [
        {
          firstName: 'Nghia',
          lastName: 'Tran'
        },
        {
          firstName: 'Super',
          lastName: 'Dev'
        },
        {
          firstName: 'Peter',
          lastName: 'Dark'
        }
      ],
      columns:[
        {
          field: 'firstName',
          title: 'First Name',
          type: 'string'
        },
        {
          field: 'lastName',
          title: 'Last Name',
          type: 'string'
        }
      ]
    }
  }
}
