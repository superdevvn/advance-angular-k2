export interface IGridCommand{
    icon: string;
    click: Function;
}

export interface IGridColumn{
    field: string;
    title: string;
    width: string;
    type: 'string' | 'number' | 'bool' | 'date' | 'datetime',
    trueValue?: string;
    falseValue?: string;
}

export interface IGridOption{
    data: any[],
    commands: IGridCommand[],
    columns: IGridColumn[]
}