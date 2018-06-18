import { Component } from '@angular/core';
import { PieChartOption } from './pie-chart-control/pie-chart-control.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  pieChartOption: PieChartOption;
  constructor(){
    this.pieChartOption = {
      items: [
        {
          title: 'Hau',
          value: 30
        },
        {
          title: 'Quoc',
          value: 35
        },
        {
          title: 'Thien',
          value: 35
        }
      ]
    };
  }
}
