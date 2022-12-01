import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Chart from 'chart.js';

import {IMovieStatementDto} from '../../../dto/i-movie-statement-dto';

import {StatementService} from '../../../service/statement.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-statement',
  templateUrl: './movie-statement.component.html',
  styleUrls: ['./movie-statement.component.css']
})
export class MovieStatementComponent implements OnInit {

  btnView = 'Xem biểu đồ';
  action: boolean;
  hiddenChart: boolean;
  numberMonth = 0;
  labelCharts: string[] = [];
  dataCharts: number[] = [];
  listMovieTop$: Observable<Array<IMovieStatementDto>>;
  timeGroup!: FormGroup;
  chart: Chart;


  constructor(private fbuilder: FormBuilder,
              private statement: StatementService,
              private  title: Title) {
    this.title.setTitle('Thống kê phim');
  }

  ngOnInit(): void {
    this.btnView = 'XEM BIỂU ĐỒ';
    this.timeGroup = this.fbuilder.group({
      time: [this.numberMonth]
    });
    this.action = true;
    this.hiddenChart = true;
    this.getList(this.numberMonth);


  }

  displayChangeTemplate() {
    this.createChart();
    if (this.btnView === 'XEM BIỂU ĐỒ') {
      this.btnView = 'XEM BẢNG SỐ LIỆU';
      this.action = false;
      this.hiddenChart = false;
      console.log(this.chart);
    } else {
      this.btnView = 'XEM BIỂU ĐỒ';
      this.action = true;
      this.hiddenChart = true;
      console.log(this.chart);
    }
  }
  displayChangeValue() {
    if (this.action) {
      this.chart = new Chart();
    } else {
      this.createChart();
      console.log(this.chart);
    }
  }

  getList(numberMonth: number) {
    this.statement.listMovieTop(this.numberMonth).subscribe((value: Array<IMovieStatementDto>) => {
      this.listMovieTop$ = new BehaviorSubject<Array<IMovieStatementDto>>(value);
      this.creatDataForChart(value);
    });
  }

  find() {
    this.numberMonth = this.timeGroup.value.time;
    this.getList(this.numberMonth);
    this.displayChangeValue();
  }

  creatDataForChart(value: Array<IMovieStatementDto>) {
    this.labelCharts = [];
    this.dataCharts = [];


    for (const item of value) {
      if (item.name != null) {
        this.labelCharts.push(item.name);
      } else {
        this.labelCharts.push(' ');
      }

      if (item.turnover != null) {
        this.dataCharts.push(item.turnover);
      } else {
        this.dataCharts.push(0);

      }
    }
  }


  createChart() {
     this.chart = new Chart('myChart', {
       type: 'bar',

       data: {
         labels: this.labelCharts,
         datasets: [
           {
             label: 'Doanh thu',
             data: this.dataCharts,
             backgroundColor: 'blue'
           },

         ]
       },
       options: {
         scales: {
           y: {
             beginAtZero: true,
             title: {
               display: true,
               text: 'VND'
             }
           }
         },
         legend: {
           display: true
         },
         responsive: true,
         indexAxis: 'x',
         aspectRatio: 2.5,
         display: true
       }
     });
  }
}
