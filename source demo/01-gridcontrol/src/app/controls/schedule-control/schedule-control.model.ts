import { EventObjectInput } from "fullcalendar";

export class ScheduleOption {
    events: ScheduleEvent[] = [];
}

export class ScheduleEvent implements EventObjectInput {
    id: string;
    title: string;
    start: Date | string;
    end: Date | string;
    items?: TooltipInfoItem[] = [];
}

export class TooltipInfo {
    title: string;
    start: string;
    end: string;
    items: TooltipInfoItem[] = [];
}

export class TooltipInfoItem {
    title: string;
    detail: string;
}