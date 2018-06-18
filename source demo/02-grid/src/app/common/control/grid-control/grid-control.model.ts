export interface IPagedListRequest{
    whereClause?: string;
    orderBy?: string;
    orderDirection?: string;
    pageNumber?: number;
    pageSize?: number
}

export class GridOption implements IGridOption {
    component: any;
    key?: string;
    url: string;
    idColumn?: string;
    filterable?: boolean = false;
    checkable?: boolean = false;
    customFilter?: Object | Function = null;
    sortable?: boolean = true;
    editable?: boolean = false;
    addable?: boolean = false;
    commands?: IGridCommand[] = [];
    columns: IGridColumn[] = [];
    constructor() {

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
    icon: string;
    title?: string;
    click?: Function;
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