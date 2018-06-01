import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleControlComponent } from '../../controls/schedule-control/schedule-control.component';
import { ScheduleOption } from '../../controls/schedule-control/schedule-control.model';

@Component({
  selector: 'app-demo-schedule',
  templateUrl: './demo-schedule.component.html',
  styleUrls: ['./demo-schedule.component.css']
})
export class DemoScheduleComponent implements OnInit {
  @ViewChild('scheduleControl1') scheduleControl1: ScheduleControlComponent;
  @ViewChild('scheduleControl2') scheduleControl2: ScheduleControlComponent;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let option = new ScheduleOption();
    option.events = [
      {
        id: 'aa',
        title: 'Event A',
        start: '2018-03-25T09:00',
        end: '2018-03-25T12:00',
        items: [{
          title: 'title A 1',
          detail: 'detail A 1'
        },{
          title: 'title A 2',
          detail: 'detail A 2'
        },{
          title: 'title A 3',
          detail: 'detail A 3'
        }]
      },
      {
        id: 'bb',
        title: 'Event B',
        start: '2018-03-25T01:00',
        end: '2018-03-25T03:00',
        items: [{
          title: 'title B 1',
          detail: 'detail B 1'
        },{
          title: 'title B 2',
          detail: 'detail B 2'
        },{
          title: 'title B 3',
          detail: 'detail B 3'
        }]
      }
    ];
    this.scheduleControl1.draw(option);
    this.scheduleControl2.draw(option);
  }

  onClick(event){
    console.log(event);
  }
}
