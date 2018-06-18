import { EventObjectInput } from "fullcalendar";

export interface ScheduleEvent extends EventObjectInput {
    start: string | Date;
    end: string | Date;
    backgroundColor?: string;
    color?: string;
    tooltipItems?: {
        title: string;
        value: string;
    }[];
    data: any;
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