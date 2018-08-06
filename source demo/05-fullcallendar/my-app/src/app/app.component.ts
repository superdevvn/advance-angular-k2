import { Component } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { Moment } from 'moment';
import { Default } from 'fullcalendar/InteractiveDateComponent';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ngAfterViewInit(){
    $('#calendar').fullCalendar({
      // defaultView: 'agendaWeek',
      defaultView: 'agendaWeek',
      dayClick: (date: Moment,jsEvent: MouseEvent, view: Default) =>{
        console.log(date.toISOString());
      },
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
      events: [{
        id: 'aaa',
        title: 'aaa',
        start: '2018/07/09 19:00',
        end: '2018/07/09 22:00',
      }],
      editable: true,
      eventResize: (event) =>{
        console.log(event.end.toString());
      }
    });

    setTimeout(() => {
      $('#calendar').fullCalendar('renderEvent',{
        id: 'bbb',
        title: 'bbb',
        start: '2018/07/10 19:00',
        end: '2018/07/10 22:00',
      });
    }, 5000);
  }
}
