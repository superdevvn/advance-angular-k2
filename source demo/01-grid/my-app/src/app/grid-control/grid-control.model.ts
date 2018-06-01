export interface IGridOption {
    items: any[],
    columns: {
        field: string;
        title: string;
        type: 'string' | 'number';
    }[];
}