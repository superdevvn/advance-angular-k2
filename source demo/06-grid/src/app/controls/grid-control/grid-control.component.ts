import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import * as uuid from 'uuid';
import { GridOption, IGridColumnConfig, IGridCommand } from './grid-control.model';
import { GridService } from './grid.service';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

export interface PagedListRequest {
  whereClause?: string;
  orderBy?: string;
  orderDirection?: string;
  pageNumber?: number;
  pageSize?: number
}

@Component({
  selector: 'grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit {
  @Input() option = new GridOption();
  @Output() onAddRow: EventEmitter<any> = new EventEmitter();
  @Output() onEditRow: EventEmitter<any> = new EventEmitter();
  @Output() onSaveRow: EventEmitter<any> = new EventEmitter();
  @Output() onCancelRow: EventEmitter<any> = new EventEmitter();

  gridOption: GridOption;
  orderBy: string;
  orderDirection: string;
  items: any[] = [];
  total: number;
  filter: any = {};
  pageNumber: number;
  numberOfPages: number[] = [5, 12, 24, 50, 100];
  pageSize: number = 12;
  currentPage: number = 1;
  @ViewChild('table') table: ElementRef;

  //Configure
  configModalId: string;
  columnConfigs: IGridColumnConfig[] = [];

  //Paginate
  pages: number[] = [1];
  pageCount: number = 5;
  totalPage: number = 1;
  constructor(private datePipe: DatePipe,
    private gridService: GridService,
    private apiService: ApiService) { }


  ngOnInit() {
    this.configModalId = uuid.v4();
    this.generateOption();
    this.reload();
  }

  ngAfterViewInit() {
    this.resize();
  }

  reload() {
    let pagedListRequest: PagedListRequest = {
      whereClause: '1>0',
      pageSize: this.pageSize,
      pageNumber: this.currentPage || 1,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection
    }

    if (this.gridOption.customFilter) {
      // Nếu custom filter là string 
      if (typeof (this.gridOption.customFilter) === 'string') {
        pagedListRequest.whereClause += ` AND ${this.gridOption.customFilter}`;
      }
      // Nếu custom filter là function 
      if (typeof (this.gridOption.customFilter) === 'function') {
        pagedListRequest.whereClause += ` AND ${this.gridOption.customFilter()}`;
      }
    }
    this.gridOption.columns.forEach(column => {
      if (this.filter[column.field]) {
        if (column.type === 'string') {
          pagedListRequest.whereClause += ` AND ${column.field}.Contains("${this.filter[column.field]}")`;
        }
        else if (column.type === 'number') {
          let value = parseFloat(this.filter[column.field].trim().replace('>=', '').replace('<=', '').replace('>', '').replace('<', ''));
          if (this.filter[column.field].indexOf('>=') > -1) {
            pagedListRequest.whereClause += ` AND ${column.field} >= ${value}`;
          } else if (this.filter[column.field].indexOf('<=') > -1) {
            pagedListRequest.whereClause += ` AND ${column.field} <= ${value}`;
          } else if (this.filter[column.field].indexOf('>') > -1) {
            pagedListRequest.whereClause += ` AND ${column.field} > ${value}`;
          } else if (this.filter[column.field].indexOf('<') > -1) {
            pagedListRequest.whereClause += ` AND ${column.field} < ${value}`;
          } else pagedListRequest.whereClause += ` AND ${column.field} = ${value}`;
        } else if (column.type === 'bool') {
          if (this.filter[column.field] === '0' || this.filter[column.field] === '1') {
            pagedListRequest.whereClause += ` AND ${column.field} = ${this.filter[column.field] === '1' ? 'true' : 'false'}`;
          }
        }
      }
    });
    this.apiService.post(this.gridOption.url, pagedListRequest)
      .then((response: any) => {
        this.items = response.entities;
        this.total = response.total;
        this.generatePaginate();
      });
  }

  selectPage(page) {
    if (this.currentPage !== page && page > 0 && page <= this.totalPage) {
      this.currentPage = page;
      this.reload();
    }
  }

  generateOption() {
    delete this.gridOption;
    this.gridOption = this.option.clone();
    this.gridOption.columns = [];
    if (this.gridOption.key) {
      let key = this.gridOption.key;
      if (!this.gridService.check(key)) {
        let columns: IGridColumnConfig[] = [];
        this.option.columns.forEach((column, index) => {
          columns.push({
            originColumn: Object.assign({}, column),
            order: index,
            isHidden: false
          });
        });
        this.gridService.set(key, columns);
      } else {
        let columns = this.gridService.get(key);
        columns.forEach(column => {
          let originColumn = this.option.columns.find(e => e.field === column.originColumn.field);
          if (originColumn) {
            column.originColumn = originColumn;
          }
        });
        this.gridService.set(key, columns);
      }

      this.columnConfigs = this.gridService.get(key);
      this.columnConfigs.forEach(column => {
        if (!column.isHidden) {
          this.filter[column.originColumn.field] = '';
          this.gridOption.columns.push({
            field: column.originColumn.field,
            type: column.originColumn.type,
            format: column.originColumn.format,
            title: column.title || column.originColumn.title,
            width: column.width || column.originColumn.width,
            // properties for boolean type
            trueValue: column.originColumn.trueValue,
            falseValue: column.originColumn.falseValue,
            // properties for values type
            values: column.originColumn.values
          });
        }
      })

    } else {
      this.gridOption.columns = Object.assign([], this.option.columns);
    }

    this.gridOption.columns = Object.assign([], this.option.columns);
  }

  generatePaginate() {
    this.pages = [];
    this.totalPage = Math.trunc(this.total / this.pageSize) + (this.total % this.pageSize === 0 ? 0 : 1);
    if (this.currentPage > this.totalPage) this.currentPage = this.totalPage;
    if (this.totalPage <= this.pageCount) {
      for (let i = 1; i <= this.totalPage; i++) this.pages.push(i);
    } else {
      if (this.currentPage < 3) this.pages = [1, 2, 3, 4, 5];
      else if (this.currentPage > this.totalPage - 2) this.pages = [this.totalPage - 4, this.totalPage - 3, this.totalPage - 2, this.totalPage - 1, this.totalPage];
      else this.pages = [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
  }

  getItems() {
    return this.items;
  }

  addRow() {
    this.items.push({});
    this.onAddRow.emit(this.items[this.items.length - 1]);
  }

  editRow(item) {
    item.data_row_temp = Object.assign({}, item);
    item.isEditing = true;
    this.onEditRow.emit(item);
  }

  saveRow(item) {
    item.isEditing = false;
    this.onSaveRow.emit(item);
  }

  cancelRow(item) {
    Object.assign(item, item.data_row_temp);
    item.isEditing = false;
    this.onCancelRow.emit(item);
  }

  sort(field: string) {
    if (this.orderBy === field) {
      this.orderDirection = this.orderDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.orderBy = field;
      this.orderDirection = 'ASC';
    }
    this.reload();
  }

  // Resize grid fix to browser
  resize() {
    $(this.table.nativeElement).height(`calc(100vh - 213px)`);
    setTimeout(() => {
      let top = $(this.table.nativeElement).offset().top;
      $(this.table.nativeElement).height(`calc(100vh - ${top + 70}px)`);
    }, 500);
  }

  loadGridConfig() {
    // this.gridService.get()
  }

  @ViewChild('importFile') importFile: ElementRef;

  importExcel() {
    // this.excelService.import().then((lines: any[]) => {
    //   let records = lines.map(line => {
    //     let record = {};
    //     this.gridOption.columns.forEach(column => {
    //       record[column.field] = line[column.title];
    //       if (column.type === 'number') record[column.field] = record[column.field] || 0;
    //       else if (column.type === 'bool') record[column.field] = record[column.field] || false;
    //       else if (column.type === 'string') record[column.field] = record[column.field] || '';
    //     });
    //     return record;
    //   });
    //   if (this.gridOption.onImportExcel) this.gridOption.onImportExcel(records);
    // });
  }

  exportExcel() {
    if (this.items && this.items.length > 0) {
      let data = this.items.map(item => {
        let obj = {};
        this.gridOption.columns.forEach(column => {
          // Nếu cell là undefined hoặc null hoặc '' thì gán bằng ''
          if (item[column.field] === undefined || item[column.field] === null || item[column.field] === '') obj[column.title] = '';
          // Nếu cell là string hoặc number thì gán bằng chính nó
          else if (column.type === 'string' || column.type === 'number') obj[column.title] = item[column.field];
          else if (column.type === 'bool') {
            // Nếu là bool thì gán bằng giá trị trueValue và falseValue (nếu có), mặc định là TRUE/FALSE
            if (item[column.field]) {
              obj[column.title] = column.trueValue || 'TRUE';
            } else {
              obj[column.title] = column.falseValue || 'FALSE';
            }
          } else if (column.type === 'date') {
            // Nếu là date thì convert theo đúng format
            let date = new Date(item[column.field]);
            obj[column.title] = this.datePipe.transform(date, 'dd/MM/yyyy');
          } else if (column.type === 'datetime') {
            // Nếu là datetime thì convert theo đúng format
            let date = new Date(item[column.field]);
            obj[column.title] = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
          } else if (column.type === 'time') {
            // Nếu là time thì convert theo đúng format
            let date = new Date(item[column.field]);
            obj[column.title] = this.datePipe.transform(date, 'HH:mm');
          } else if (column.type === 'values') {
            // Nếu là values thì lấy giá trị của value được chọn
            let data = column.values.find(e => e.value == item[column.field]);
            if (data) obj[column.title] = data.text;
            else obj[column.title] = '';
          }
        });
        return obj;
      });
      // this.excelService.export({
      //   data: data
      // });
    } else {
      //this.notifyService.warning('GRID_EMPTY');
    }
  }

  selectRow(item) {
    if (this.gridOption.onSelectRow) this.gridOption.onSelectRow.bind(this.gridOption.component)(item);
  }

  commandHandler = {
    icon: (command: IGridCommand, item: any) => {
      if (typeof (command.icon) === 'function') {
        return command.icon(item);
      } else return command.icon;
    },
    title: (command: IGridCommand, item: any) => {
      if (typeof (command.title) === 'function') {
        return command.title(item);
      } else return command.title;
    },
    disalbed: (command: IGridCommand, item: any) => {
      if (command.disabled) {
        if (command.disabled instanceof Function) {
          return command.disabled(item);
        } else return false;
      } else return false;
    }
  }
}
