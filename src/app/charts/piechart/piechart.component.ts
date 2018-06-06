import {Component, OnInit} from '@angular/core';
import {RecordService} from '../../services/record.service';
import {Record} from '../../models/record.interface';

declare let d3: any;

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss'],
})
export class PiechartComponent implements OnInit {
  options;
  data;
  totalIncome;
  totalExpenses;
  total;
  showchart = true;

  constructor(private recordsService: RecordService) {}

  ngOnInit() {
    this.recordsService.records.subscribe(data => {
      console.log('data:' + JSON.stringify(data.length));
      if (data.length === 0) {
        this.showchart = false;
        return;
      }
      this.data = data.filter(record => !record.income).map(record => {
        return {
          name: record.name,
          value: record.value,
          img: record.img,
          income: record.income,
        };
      });
      this.totalIncome = data
        .filter(record => {
          return record.income;
        })
        .map(record => record.value)
        .reduce((acc, el) => {
          return acc + el;
        }, 0);

      this.totalExpenses = data
        .filter(record => {
          return !record.income;
        })
        .map(record => record.value)
        .reduce((acc, el) => {
          return acc + el;
        }, 0);
      // tslint:disable-next-line:no-trailing-whitespace
      this.total =
        parseInt(this.totalIncome, 10) - parseInt(this.totalExpenses, 10);
    });

    this.options = {
      chart: {
        type: 'pieChart',
        height: 400,
        x: function(d) {
          return d.name;
        },
        y: function(d) {
          return d.value;
        },
        showLabels: true,
        duration: 500,
        showValues: true,
        showLegend: true,
        labelType: 'percent',
        labelTreshold: 0.01,
        labelSunbeamLayout: true,
        useInteractiveGuideline: false,
        interactive: true,
        tooltip: {
          contentGenerator: function(d) {
            return (
              "<img style='height:30px;width:30px' src=" + d.data.img + '/>'
            );
          },
        },
      },
    };
  }
}
