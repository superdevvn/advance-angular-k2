export class ScheduleEvent {
    id?: string;
    title: string;
    start: string | Date;
    end: string | Date;
    backgroundColor?: string;
    color?: string;
    tooltipItems?: {
        title: string;
        value: string;
    }[];
}

export class ScheduleExternalEvent {
    title: string;
    data?: any;
}

export class ScheduleOption {
    events: ScheduleEvent[] = [];
}

export class ScheduleTooltipInfo {
    title: string;
    start: string;
    end: string;
    items: {
        title: string;
        value: string;
    }[] = [];
}