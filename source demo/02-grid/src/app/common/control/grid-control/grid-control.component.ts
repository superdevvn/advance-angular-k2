import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import * as uuid from 'uuid';
import { GridOption, IGridColumnConfig, IPagedListRequest } from './grid-control.model';
import { ApiService } from '../../service/api.service';
import { ModalService } from '../../service/modal-service.service';
import { GridService } from './grid.service';
import { ExcelService } from '../../service/excel.service';
import { NotifyService } from '../../service/notify.service';
@Component({
  selector: 'grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit {
  @Input() option = new GridOption();
  @Output() onImportExcel: EventEmitter<any> = new EventEmitter();
  @Output() onAddRow: EventEmitter<any> = new EventEmitter();
  @Output() onEditRow: EventEmitter<any> = new EventEmitter();
  @Output() onSaveRow: EventEmitter<any> = new EventEmitter();
  @Output() onCancelRow: EventEmitter<any> = new EventEmitter();

  private gridOption: GridOption;
  private orderBy: string;
  private orderDirection: string;
  private items: any[] = [];
  private total: number;
  private filter: any = {};
  private pageNumber: number;
  private numberOfPages: number[] = [5, 12, 24, 50, 100];
  private pageSize: number = 12;
  private currentPage: number = 1;
  @ViewChild('table') table: ElementRef;

  //Configure
  private configModalId: string;
  private columnConfigs: IGridColumnConfig[] = [];

  //Paginate
  private pages: number[] = [1];
  private pageCount: number = 5;
  private totalPage: number = 1;
  constructor(private apiService: ApiService,
    private modalService: ModalService,
    private gridService: GridService,
    private excelService: ExcelService,
    private notifyService: NotifyService) { }


  ngOnInit() {
    this.configModalId = uuid.v4();
    this.generateOption();
    this.reload();
  }

  ngAfterViewInit() {
    this.resize();
  }

  reload() {
    let skip = (this.currentPage - 1) * this.pageSize;
    let limit = this.pageSize;
    let filter: any;
    if (this.gridOption.customFilter) {
      // Nếu custom filter là object 
      if (this.gridOption.customFilter instanceof Object) {
        filter = $.extend(filter, this.gridOption.customFilter);
      }
      // Nếu custom filter là function 
      if (this.gridOption.customFilter instanceof Function) {
        filter = $.extend(filter, this.gridOption.customFilter());
      }
    }
    this.gridOption.columns.forEach(column => {
      if (this.filter[column.field]) {
        if (column.type === 'string') {
          let columnFilter = {};
          columnFilter[column.field] = { like: `%${this.filter[column.field]}%` };
          Object.assign(filter, columnFilter);
        }
        else if (column.type === 'number') {
          let columnFilter = {};
          let value = parseFloat(this.filter[column.field].trim().replace('>=', '').replace('<=', '').replace('>', '').replace('<', ''));
          if (this.filter[column.field].indexOf('>=') > -1) {
            columnFilter[column.field] = { gte: value };
          } else if (this.filter[column.field].indexOf('<=') > -1) {
            columnFilter[column.field] = { lte: value };
          } else if (this.filter[column.field].indexOf('>') > -1) {
            columnFilter[column.field] = { gt: value };
          } else if (this.filter[column.field].indexOf('<') > -1) {
            columnFilter[column.field] = { lt: value };
          } else columnFilter[column.field] = value;
          Object.assign(filter, columnFilter);
        } else if (column.type === 'bool') {
          let columnFilter = {};
          if (this.filter[column.field] || this.filter[column.field] === '0') {
            columnFilter[column.field] = { like: this.filter[column.field] };
            Object.assign(filter, columnFilter);
          }
        }
      }
    });

    let pagedListRequest: IPagedListRequest = {
      whereClause: '1>0',
      pageSize: 12,
      pageNumber: 1
    }

    this.apiService.post(this.gridOption.url, pagedListRequest)
      .then(response => {
        this.items = response.json().res;
        this.total = response.json().total;
        this.generatePaginate();
      });
  }

  private selectPage(page) {
    if (this.currentPage !== page && page > 0 && page <= this.totalPage) {
      this.currentPage = page;
      this.reload();
    }
  }

  private generateOption() {
    delete this.gridOption;
    this.gridOption = new GridOption();
    this.gridOption.component = this.option.component;
    this.gridOption.key = this.option.key;
    this.gridOption.url = this.option.url;
    this.gridOption.checkable = this.option.checkable;
    this.gridOption.filterable = this.option.filterable;
    this.gridOption.sortable = this.option.sortable;
    this.gridOption.editable = this.option.editable;
    this.gridOption.addable = this.option.addable;
    this.gridOption.idColumn = this.option.idColumn;
    this.gridOption.customFilter = this.option.customFilter;
    this.gridOption.commands = this.option.commands;
    if (this.gridOption.key) {
      let key = `${this.gridOption.component.constructor.name}-${this.gridOption.key}`;
      if (!this.gridService.check(key)) {
        let columns: IGridColumnConfig[] = [];
        this.option.columns.forEach((column, index) => {
          columns.push({
            originColumn: $.extend({}, column),
            order: index,
            isHidden: false
          });
        });
        this.gridService.set(key, columns);
      } else {
        let columns = this.gridService.get(key);
        columns.forEach((column, index) => {
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
            trueValue: column.originColumn.trueValue,
            falseValue: column.originColumn.falseValue,
            title: column.title || column.originColumn.title,
            width: column.width || column.originColumn.width
          });
        }
      })

    } else {
      this.gridOption.columns = $.extend([], this.option.columns);
    }
  }

  private generatePaginate() {
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

  private sort(field: string) {
    if (this.orderBy === field) {
      this.orderDirection = this.orderDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.orderBy = field;
      this.orderDirection = 'ASC';
    }
    this.reload();
  }

  // Resize grid fix to browser
  private resize() {
    $(this.table.nativeElement).height(`calc(100vh - 51px)`);
    setTimeout(() => {
      let top = $(this.table.nativeElement).offset().top;
      $(this.table.nativeElement).height(`calc(100vh - ${top + 55}px)`);
    }, 500);
  }

  private loadGridConfig() {
    // this.gridService.get()
  }

  @ViewChild('importFile') importFile: ElementRef;

  private importExcel() {
    this.excelService.import().then((lines: any[]) => {
      let records = lines.map(line => {
        let record = {};
        this.gridOption.columns.forEach(column => {
          record[column.field] = line[column.title];
          if (column.type === 'number') record[column.field] = record[column.field] || 0;
          else if (column.type === 'bool') record[column.field] = record[column.field] || false;
          else if (column.type === 'string') record[column.field] = record[column.field] || '';
        });
        return record;
      });
      this.onImportExcel.emit(records);
    });
  }

  private exportExcel() {
    if (this.items && this.items.length > 0) {
      let data = this.items.map(item => {
        let obj = {};
        this.gridOption.columns.forEach(column => {
          obj[column.title] = item[column.field];
        });
        return obj;
      });
      this.excelService.export({
        data: data
      });
    } else {
      this.notifyService.warning('No data to export');
    }
  }

  private resetConfig() {
    let key = `${this.gridOption.component.constructor.name}-${this.gridOption.key}`;
    let columns: IGridColumnConfig[] = [];
    this.option.columns.forEach((column, index) => {
      columns.push({
        originColumn: $.extend({}, column),
        order: index,
        isHidden: false
      });
    });
    this.gridService.set(key, columns);
    this.generateOption();
    this.modalService.close(this.configModalId);
  }

  private saveModalConfig() {
    let key = `${this.gridOption.component.constructor.name}-${this.gridOption.key}`;
    this.gridService.set(key, this.columnConfigs);
    this.generateOption();
    this.modalService.close(this.configModalId);
  }

  private openModalConfig() {
    this.modalService.open(this.configModalId);
  }

  private closeModalConfig() {
    this.modalService.close(this.configModalId);
  }
}
