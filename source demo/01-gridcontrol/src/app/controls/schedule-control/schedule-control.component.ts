import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as uuid from 'uuid';
import { TooltipInfo, ScheduleOption } from './schedule-control.model';
import { Moment } from 'moment';
import { EventObjectInput } from 'fullcalendar';

@Component({
  selector: 'app-schedule-control',
  templateUrl: './schedule-control.component.html',
  styleUrls: ['./schedule-control.component.css']
})
export class ScheduleControlComponent implements OnInit {
  @Output() onClickEvent: EventEmitter<EventObjectInput> = new EventEmitter();
  option: ScheduleOption;
  control: JQuery<HTMLElement>;
  controlId: string;

  tooltipId: string;
  tooltip: JQuery<HTMLElement>;
  tooltipInfo: TooltipInfo = new TooltipInfo();

  constructor() {
    this.controlId = uuid.v4();
    this.tooltipId = uuid.v4();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.control = $(`#${this.controlId}`);
    this.tooltip = $(`#${this.tooltipId}`);
    $('body').append(this.tooltip);
  }

  draw(option: ScheduleOption) {
    let that = this;
    this.option = option;
    this.control.fullCalendar({
      defaultView: 'agendaWeek',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'Hôm nay',
        month: 'Tháng',
        week: 'Tuần',
        day: 'Ngày'
      },
      events: option.events,
      // events: [
      //   {
      //     id: 'aa',
      //     title: 'Event A',
      //     start: '2018-03-25T09:00',
      //     end: '2018-03-25T12:00'
      //   },
      //   {
      //     id: 'bb',
      //     title: 'Event B',
      //     start: '2018-03-25T01:00',
      //     end: '2018-03-25T03:00'
      //   }
      // ],
      eventClick: (event, jsEvent, view) => {
        this.onClickEvent.emit(event);
      },
      eventMouseover: function (event, jsEvent, view) {
        that.tooltip.css('top', jsEvent.clientY + 10);
        that.tooltip.css('left', jsEvent.clientX - 130);
        that.tooltipInfo.title = event.title;
        that.tooltipInfo.start = that.momentToString(event.start as Moment);
        that.tooltipInfo.end = that.momentToString(event.end as Moment);
        that.tooltipInfo.items = that.option.events.find(e => e.id == event.id).items;
        $(this).mousemove(function (handler) {
          that.tooltip.css('top', handler.clientY + 10);
          that.tooltip.css('left', handler.clientX - 130);
        });
        that.tooltip.fadeIn('fast');
      },
      eventMouseout: function (event, jsEvent, view) {
        $(this).off('mousemove');
        that.tooltip.fadeOut('fast');
      },
    });
  }

  momentToString(moment: Moment) {
    return `${moment.hour()}:${moment.minute()}`;
  }
}
