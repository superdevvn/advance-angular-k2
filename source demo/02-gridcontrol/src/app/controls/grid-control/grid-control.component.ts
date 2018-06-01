import { Component, OnInit, Input } from '@angular/core';
import { IGridOption, GridOption } from './grid-control.model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit {
  @Input() option: IGridOption;
  gridOption: GridOption;
  pagingList: number[] = [];
  constructor(private http: Http) { }

  ngOnInit() {
    this.gridOption = new GridOption();
    this.gridOption.url = this.option.url;
    this.gridOption.data = this.option.data;
    this.gridOption.commands = this.option.commands;
    this.gridOption.columns = this.option.columns;
    this.reload();
  }

  reload() {
    let whereClause = '1>0';
    this.gridOption.columns.forEach(column => {
      if (column.filterValue) {
        if (column.type === 'string')
          whereClause += ` AND ${column.field}.Contains("${column.filterValue}")`;
      }
    });
    let data = {
      pageSize: this.gridOption.pageSize,
      pageNumber: this.gridOption.pageNumber,
      orderBy: this.gridOption.orderBy,
      orderDirection: this.gridOption.orderDirection,
      whereClause: whereClause
    };
    this.http.post(this.gridOption.url, data).toPromise()
      .then(res => {
        this.gridOption.total = res.json().TotalItemCount;
        this.gridOption.data = res.json().Entities;
        this.gridOption.pageCount = res.json().PageCount;
        this.generatePaging();
      });
  }

  goToPage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.pagingList.length) {
      this.gridOption.pageNumber = pageNumber;
      this.reload();
    }
  }

  sort(field: string) {
    if (this.gridOption.orderBy === field)
      this.gridOption.orderDirection = this.gridOption.orderDirection === 'ASC' ? 'DESC' : 'ASC';
    else {
      this.gridOption.orderBy = field;
      this.gridOption.orderDirection = 'DESC';
    }
    this.reload();
  }

  generatePaging() {
    if (this.gridOption.pageCount <= 5) {
      this.pagingList = [];
      let t = this.gridOption.pageCount;
      for (let i = 1; i <= t; i++)
        this.pagingList.push(i);
    }
    else {
      if (this.gridOption.pageNumber <= 3) this.pagingList = [1, 2, 3, 4, 5];
      else if (this.gridOption.pageNumber >= this.gridOption.pageCount - 2) {
        let t = this.gridOption.pageCount;
        this.pagingList = [t - 4, t - 3, t - 2, t - 1, t];
      } else {
        let t = this.gridOption.pageNumber;
        this.pagingList = [t - 2, t - 1, t, t + 1, t + 2];
      }
    }
  }
}
