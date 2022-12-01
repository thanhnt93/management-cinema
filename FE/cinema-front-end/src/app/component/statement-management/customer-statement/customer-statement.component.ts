import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Chart from 'chart.js';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICustomerStatementDto} from '../../../dto/i-customer-statement-dto';
import {StatementService} from '../../../service/statement.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-customer-statement',
  templateUrl: './customer-statement.component.html',
  styleUrls: ['./customer-statement.component.css']
})
export class CustomerStatementComponent implements OnInit {

  btnView = 'XEM BIỂU ĐỒ';
  action: boolean;
  numberMonth = 0;
  labelCharts: string[] = [];
  dataCharts: number[] = [];
  timeGroup!: FormGroup;
  chart: Chart;
  listCustomerTop$: Observable<Array<ICustomerStatementDto>>;
  hiddenChart: boolean;


  constructor(private fBuilder: FormBuilder,
              private statement: StatementService,
              private  title: Title) {
    this.title.setTitle('Thống kê thành viên');
  }

  ngOnInit(): void {
    this.btnView = 'XEM BIỂU ĐỒ';
    this.action = true;
    this.hiddenChart = true;
    this.timeGroup = this.fBuilder.group({
      time: [this.numberMonth]
    });
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
    this.statement.listCustomerTop(this.numberMonth).subscribe((value: Array<ICustomerStatementDto>) => {
      console.log(value);
      this.listCustomerTop$ = new BehaviorSubject<Array<ICustomerStatementDto>>(value);
      this.creatDataForChart(value);
    });
  }

  find() {
    this.numberMonth = this.timeGroup.value.time;
    this.getList(this.numberMonth);
    this.displayChangeValue();
  }

  creatDataForChart(value: Array<ICustomerStatementDto>) {
    this.labelCharts = [];
    this.dataCharts = [];


    for (const item of value) {
      if (item.name != null) {
        this.labelCharts.push(item.name);
      } else {
        this.labelCharts.push(' ');
      }

      if (item.totalMoney != null) {
        this.dataCharts.push(item.totalMoney);
      } else {
        this.dataCharts.push(0);

      }
    }
  }


  createChart() {
    this.chart = new Chart('myChart', {
        type: 'bar',
        data: {
          // tslint:disable-next-line:max-line-length
          labels: this.labelCharts,
          datasets: [{
            label: 'Tiêu phí.',
            // tslint:disable-next-line:max-line-length
            data: this.dataCharts,
            backgroundColor: 'blue',
            hoverBackgroundColor: 'blue',
            hoverBorderColor: 'white',
            hoverBorderWidth: 3,
            borderColor: '#666',
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            yAxes: [{
              beginAtZero: true,
              ticks: {
                callback(value, index, values) {
                  return value + ' VND';
                }
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          indexAxis: 'x',
          aspectRatio: 1.8,
          display: true
        }
      });
    /*this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.labelCharts,
        datasets: [
          {
            label: 'Tổng tiền',
            data: this.dataCharts,
            backgroundColor: 'blue'
          }]
      },
      options: {
        scales: {
          yAxes: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'VND'
            }
          }
        }
      }
    });*/
  }
}
