import { Component } from '@angular/core';
import { IGridOption } from './grid-control/grid-control.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gridOption1: IGridOption;
  gridOption2: IGridOption;
  constructor(){
    this.gridOption1 = {
      items: [
        {
          firstName: 'Nghia',
          lastName: 'Tran',
          age: 12
        },
        {
          firstName: 'Super',
          lastName: 'Dev',
          age: 26
        },
        {
          firstName: 'Peter',
          lastName: 'Dark',
          age: 58
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
        },
        {
          field: 'age',
          title: 'Age',
          type: 'number'
        }
      ]
    }

    this.gridOption2 = {
      items: [
        {
          code: '001',
          name: 'DELL'
        },
        {
          code: '002',
          name: 'ASUS'
        },
        {
          code: '003',
          name: 'HP'
        }
      ],
      columns:[
        {
          field: 'code',
          title: 'Mã hàng',
          type: 'string'
        },
        {
          field: 'name',
          title: 'Tên hàng',
          type: 'string'
        }
      ]
    }
  }

  changeData(){
    // this.gridOption = {
    //   items: [
    //     {
    //       code: '001',
    //       name: 'DELL'
    //     },
    //     {
    //       code: '002',
    //       name: 'ASUS'
    //     },
    //     {
    //       code: '003',
    //       name: 'HP'
    //     }
    //   ],
    //   columns:[
    //     {
    //       field: 'code',
    //       title: 'Mã hàng',
    //       type: 'string'
    //     },
    //     {
    //       field: 'name',
    //       title: 'Tên hàng',
    //       type: 'string'
    //     }
    //   ]
    // }
  }
}
