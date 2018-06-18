import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Moment, MomentInput } from 'moment';
import { EventObjectInput } from 'fullcalendar';

import { ScheduleEvent, ScheduleOption, ScheduleTooltipInfo, ScheduleExternalEvent } from './schedule-control.model';
import * as $ from 'jquery';
import 'fullcalendar';
import 'jqueryui';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'schedule-control',
  templateUrl: './schedule-control.component.html',
  styleUrls: ['./schedule-control.component.css']
})
export class ScheduleControlComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();
  @Output() onDrop = new EventEmitter<any>();
  @Output() onClickEvent = new EventEmitter<any>();
  @Output() onUpdateEvent = new EventEmitter<any>();

  @ViewChild('control') controlRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;
  @ViewChildren('draggableEvent') draggableEvents: QueryList<ElementRef>;
  draggableEventSubcription: any;

  control: JQuery<HTMLElement>;

  tooltip: JQuery<HTMLElement>;

  tooltipInfo: ScheduleTooltipInfo = new ScheduleTooltipInfo();
  option: ScheduleOption;

  externalEvents: ScheduleExternalEvent[] = [];

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.control = $(this.controlRef.nativeElement);
    this.tooltip = $(this.tooltipRef.nativeElement);
  }

  ngAfterViewInit() {
    this.tooltip.appendTo('body');
    this.subscribeDraggableEvents();
  }

  ngOnDestroy() {
    // Remove tooltip
    this.tooltip.remove();
    this.unsubscribeDraggableEvents();
  }

  subscribeDraggableEvents() {
    let that = this;
    this.draggableEventSubcription = this.draggableEvents.changes.subscribe((draggableEvents: QueryList<ElementRef>) => {
      draggableEvents.forEach((externalEvent, index) => {
        $(externalEvent.nativeElement)
          .data('external', this.externalEvents[index].data)
          .draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
          });
      })
    });
  }

  unsubscribeDraggableEvents() {
    if (this.draggableEventSubcription) this.draggableEventSubcription.unsubscribe();
  }

  /** Draw schedule */
  draw(option: ScheduleOption) {
    this.option = option;
    let that = this;
    this.control.empty();
    this.control.fullCalendar({
      // Properties
      defaultView: 'agendaWeek',
      editable: true,
      droppable: true,
      dragRevertDuration: 0,
      header: {
        right: 'month,agendaWeek,agendaDay', // buttons for switching between views
        center: 'title',
        left: 'today prev,next'
      },
      events: option.events,
      eventOverlap: false,
      // Events
      drop: function (moment: Moment, jsEvent: MouseEvent, ui) {
        that.onDrop.emit({
          date: that.momentToDate(moment),
          data: $(this).data('external')
        });
      },
      dayClick: (moment: Moment) => {
        this.onClick.emit(this.momentToDate(moment));
      },
      eventMouseover: function (event, jsEvent, view) {
        // Set tooltip data
        that.tooltipInfo.title = event.title;
        that.tooltipInfo.start = that.momentToTimeString(event.start as Moment);
        that.tooltipInfo.end = that.momentToTimeString(event.end as Moment);
        that.tooltipInfo.items = that.option.events.find(e => e.id === event.id).tooltipItems;

        if (that.tooltipInfo.items) {
          // Set tooltip position
          that.tooltip.css('top', jsEvent.clientY + 20);
          that.tooltip.css('left', jsEvent.clientX - 170);
          // Show tooltip
          that.tooltip.fadeIn('fast');
        }

        $(this).on('mousemove', function (e) {
          that.tooltip.css('top', e.clientY + 20);
          that.tooltip.css('left', e.clientX - 170);
        });
      },
      eventMouseout: function () {
        // Hide tooltip
        that.tooltip.fadeOut('fast');
        $(this).off('mousemove');
      },
      eventClick: (event: ScheduleEvent) => {
        event.start = this.momentToDate(event.start);
        event.end = this.momentToDate(event.end);
        this.onClickEvent.emit(event);
      },
      eventDrop: (event: ScheduleEvent) => {
        event.start = this.momentToDate(event.start);
        event.end = this.momentToDate(event.end);
        this.onUpdateEvent.emit(event);
      },
      eventResize: (event: ScheduleEvent) => {
        // event.id, event.title, event.start, event.end
        event.start = this.momentToDate(event.start);
        event.end = this.momentToDate(event.end);
        this.onUpdateEvent.emit(event);
      }
    })
    this.resize();
  }

  refetchEvents(events) {
    this.control.fullCalendar('removeEvents');
    this.control.fullCalendar('addEventSource', events);
    this.control.fullCalendar('refetchEvents');
  }

  private resize() {
    setTimeout(() => {
      this.control.height(`${$(window).height() - this.control.offset().top - 35}px`);
      this.control.fullCalendar('option', 'height', $(window).height() - this.control.offset().top - 45);
    }, 1000);
  }

  externalEvent = {
    add: (event: ScheduleExternalEvent | ScheduleExternalEvent[]) => {
      let that = this;
      if (event instanceof Array) {
        event.forEach(item => {
          this.externalEvents.push(item);
        });
      } else {
        this.externalEvents.push(event);
      }
    },
    clear: () => {
      this.externalEvents = [];
    }
  }

  /** Draw new event */
  renderEvent(event: ScheduleEvent) {
    this.option.events.push(event);
    this.control.fullCalendar('renderEvent', event);
  }

  /** Convert Moment to String with format 'HH:mm' */
  private momentToTimeString(moment: Moment) {
    let hour = (`0${moment.hour()}`).slice(-2);
    let minute = (`0${moment.minute()}`).slice(-2);
    return `${hour}:${minute}`;
  }

  /** Convert Moment to DateTime */
  private momentToDate(moment: any) {
    let date = new Date();
    if (moment instanceof Date) date = moment;
    if (typeof (moment) == 'string') date = new Date(moment);
    if (typeof (moment) == 'number') date = new Date(moment);
    date = new Date(moment.year(), moment.month(), moment.date(), moment.hour(), moment.minute(), moment.millisecond());
    return this.datePipe.transform(date, 'yyyy/MM/dd HH:mm');
  }
}
