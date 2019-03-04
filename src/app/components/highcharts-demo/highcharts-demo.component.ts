import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highcharts-demo',
  templateUrl: './highcharts-demo.component.html',
  styleUrls: ['./highcharts-demo.component.scss']
})
export class HighchartsDemoComponent implements OnInit {
  customValue:Number[] = [1, 2, 3];
  Highcharts = Highcharts;
  chartOptions:any;
  constructor() { }

  ngOnInit() {
    this.initHighCharts();
  }

  inputChange() {
    this.initHighCharts();
  }
  initHighCharts() {
    this.chartOptions = {
      series: [{
        data: this.customValue.slice()
      }]
    }
  }
}
