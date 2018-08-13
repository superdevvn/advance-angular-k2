import { Component } from '@angular/core';
import { ExcelService } from './excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private excelService: ExcelService) {

  }

  import() {
    this.excelService.import().then(items => {
      console.log(items);
    });
  }

  export() {
    const items = [
      {
        Code: 1,
        Name: 'A'
      },
      {
        Code: 2,
        Name: 'B'
      },
      {
        Code: 3,
        Name: 'C'
      },
      {
        Code: 4,
        Name: 'D'
      },
    ];
    this.excelService.export(items);
  }
}
