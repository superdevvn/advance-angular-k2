import { Component, OnInit, Input } from '@angular/core';
import { IGridOption } from './grid-control.model';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.css']
})
export class GridControlComponent implements OnInit {
  @Input() gridOption: IGridOption;
  constructor() { }

  ngOnInit() {
  }

}
