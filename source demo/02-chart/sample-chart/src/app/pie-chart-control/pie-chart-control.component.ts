import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { PieChartOption } from './pie-chart-control.model';
@Component({
  selector: 'app-pie-chart-control',
  templateUrl: './pie-chart-control.component.html',
  styleUrls: ['./pie-chart-control.component.css']
})
export class PieChartControlComponent implements OnInit {
  Colors = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'];
  @Input() option: PieChartOption;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    let config: Chart.ChartConfiguration = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: this.option.items.map(item=>item.value),
          backgroundColor: this.option.items.map((item, index)=> this.Colors[index]),
          label: 'AAA'
        }],
        labels: this.option.items.map(item=>item.title),
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        }
      }
    };
    let ctx = (document.getElementById('pieChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, config);
  }
}
