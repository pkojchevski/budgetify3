import { Component, OnInit } from '@angular/core';
import { SelectedDate } from '../../models/selectedDate.interface';
import { SelectedDateService } from '../../services/selectedDate.service';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  data;
  options;
  selectedDate;
  records;
  constructor(private sdService: SelectedDateService, private recordsService: RecordService) { }


  ngOnInit() {

    this.sdService.selectedDate.subscribe(data => this.selectedDate = data);

    this.recordsService.records.subscribe(data => {
      this.data = data
      .filter(record => {
        return !record.income;
      });
      // .map(record => {
      // return {
      //   'name': record.name, 'value': record.value, 'img': record.img, 'income': record.income
      // };
    });
    this.data = [{key: 'Cumulative Return', values: [...this.data]}];
    this.options = {
      chart: {
        type: 'discreteBarChart',
        stacked: 'false',
        height: 300,
        margin : {
            top: 20,
            right: 20,
            bottom: 50,
            left: 55
        },
        x: function(d) { return d.week; },
        y: function(d) { return d.value; },
        showControls: true,
        showValues: false,
        valueFormat: function(d) {
            return 'PLN' + d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: '',
            axisLabelDistance: -10
        },
      useInteractiveGuideline: false,
      interactive: true,
      tooltip: {
        contentGenerator: function(d) { return '<img style=\'height:30px;width:30px\' src=' + d.data.img + '>'; }
     }

      }
};

  }

}
