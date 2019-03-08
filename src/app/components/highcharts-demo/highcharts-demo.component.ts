import { Component, OnInit, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Update } from 'src/app/ngrx/actions/couter.actions';

@Component({
  selector: 'app-highcharts-demo',
  templateUrl: './highcharts-demo.component.html',
  styleUrls: ['./highcharts-demo.component.scss']
})
export class HighchartsDemoComponent implements OnInit {
  counterValue$:Observable<Number>;
  customValue:Number[] = [1, 2, 3];
  Highcharts = Highcharts;
  chartOptions:any;
  constructor(private store: Store<{ count: Number }>) {
    this.counterValue$ = this.store.pipe(select('count'));
  }

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
  updateCount(counterValue: Number) {
    this.store.dispatch(new Update(counterValue));
  }
}
