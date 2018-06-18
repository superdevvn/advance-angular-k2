export interface IPagedListRequest {
    whereClause?: string;
    orderBy?: string;
    orderDirection?: string;
    pageNumber?: number;
    pageSize?: number
}

export class GridOption implements IGridOption {
    height: string = null;
    width: string = null;
    component: any;
    key: string = null;
    url: string;
    type: 'default' | 'custom' = 'default';
    idColumn: string = null;
    filterable: boolean = false;
    checkable: boolean = false;
    customFilter: String | Object | Function = null;
    sortable: boolean = true;
    editable: boolean = false;
    addable: boolean = false;
    commands: IGridCommand[] = [];
    columns: IGridColumn[] = [];

    // events
    onSelectRow: Function = null;
    onImportExcel: Function = null;
    constructor() {

    }
    clone() {
        let gridOption = new GridOption();
        gridOption.height = this.height;
        gridOption.width = this.width;
        gridOption.component = this.component;
        gridOption.key = this.key;
        gridOption.url = this.url;
        gridOption.type = this.type;
        gridOption.idColumn = this.idColumn;
        gridOption.filterable = this.filterable;
        gridOption.checkable = this.checkable;
        gridOption.customFilter = this.customFilter;
        gridOption.sortable = this.sortable;
        gridOption.editable = this.editable;
        gridOption.addable = this.addable;
        gridOption.commands = this.commands;
        gridOption.columns = this.columns;

        // events
        gridOption.onSelectRow = this.onSelectRow;
        gridOption.onImportExcel = this.onImportExcel;
        return gridOption;
    }
}

export interface IGridOption {
    component?: any;
    key?: string;
    url: string;
    idColumn?: string;
    filterable?: boolean;
    customFilter?: Object | Function;
    sortable?: boolean;
    editable?: boolean;
    addable?: boolean;
    commands?: IGridCommand[];
    columns: IGridColumn[];
}

export interface IGridCommand {
    icon: string | Function;
    title?: string | Function;
    click?: Function;
    disabled?: string | Function;
}

export interface IGridColumn {
    field: string;
    title: string;
    type: 'string' | 'number' | 'bool' | 'date' | 'datetime' | 'time' | 'values';
    width?: string;
    format?: string;
    // properties for bool type
    trueValue?: string;
    falseValue?: string;
    values?: IValue[];
}

export interface IGridFilter {
    field: string;
    type: string;
    operator?: ''
}

export interface IValue {
    value: string;
    text: string;
    icon?: string;
    color?: string;
    backgroundColor?: string;
}

export interface IGridColumnConfig {
    originColumn: IGridColumn;
    title?: string;
    width?: string;
    order?: number;
    isHidden: boolean;
}