// http://icheck.fronteed.com/
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.css']
})
export class CheckboxControlComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    ($('input') as any).iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%'
    });
  }
}