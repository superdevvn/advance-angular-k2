export class GridOption{
    url: string;
    commands: {
        icon: string;
        title: string;
        click: Function
    }[] = [];
    columns:{
        field: string;
        title: string;
        type: 'string' | 'number' | 'bool' | 'date';
        width?: string;
    }[] = []
}