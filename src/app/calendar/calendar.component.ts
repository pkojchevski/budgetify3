import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {cloneDeep, range} from 'lodash';
import {RecordService} from '../services/record.service';
import {ArrangedataService} from '../services/arrangedata.service';
import {SearchDate} from '../models/searchDate.interface';
import {SelectedDate} from '../models/selectedDate.interface';
import {SelectedDateService} from '../services/selectedDate.service';
import {slideInOutAnimations} from '../animations/index';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [slideInOutAnimations],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@slideInOutAnimations]': ''},
})
export class CalendarComponent implements OnInit {
  weekDays = ['#cw', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  monthDays = [];
  // tslint:disable-next-line:max-line-length
  currentDate: SearchDate;
  monthWeeks = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octomber',
    'November',
    'December',
  ];
  years = range(2030, 2000);
  selectedDate;
  selection;

  constructor(
    private recordService: RecordService,
    private arrangeData: ArrangedataService,
    private sdService: SelectedDateService
  ) {}

  ngOnInit(): void {
    this.currentDate = {
      currentDayOfMonth: new Date().getDate(),
      date: new Date()
        .toLocaleDateString('en-GB', {
          year: 'numeric',
          day: 'numeric',
          month: 'short',
        })
        .split(' ')
        .join('-'),
      month: new Date().getMonth(),
      monthtext: this.months[new Date().getMonth()],
      year: new Date().getFullYear(),
      firstDayOfFirstWeek: this.arrangeData.toIsoWeekDay(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()
      ),
      firstWeek: this.arrangeData.getWeek(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      lastWeek: this.arrangeData.getWeek(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ),
      currentWeek: this.arrangeData.getWeek(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
    };
    this.selectedDate = Object.assign({}, this.currentDate);
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.currentDate.firstDayOfFirstWeek,
      this.currentDate.month,
      this.currentDate.year
    );
    this.monthWeeks = range(
      this.currentDate.firstWeek,
      this.currentDate.lastWeek + 1
    );
  }

  isToday(d) {
    return this.selectedDate.currentDayOfMonth === d;
  }

  isThisWeek(week) {
    return this.selectedDate.currentWeek === week;
  }

  dayClicked(d) {
    this.selectedDate.currentDayOfMonth = d;
    this.selectedDate.date = `${this.selectedDate.year}-${
      this.selectedDate.monthtext
    }-${this.selectedDate.currentDayOfMonth}`;
    (this.selectedDate.currentWeek = this.arrangeData.getWeek(
      this.selectedDate.year,
      this.selectedDate.month,
      d
    )),
      this.sdService.changeDate({
        period: 'day',
        date: this.selectedDate.date,
        createdAt: this.selectedDate.date,
        month: this.selectedDate.month,
        year: this.selectedDate.year,
        week: this.selectedDate.currentWeek,
      });

    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }

  // when button today is clicked
  today() {
    this.selectedDate = Object.assign({}, this.currentDate);
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.selectedDate.firstDayOfFirstWeek,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.monthWeeks = range(
      this.selectedDate.firstWeek,
      this.selectedDate.lastWeek + 1
    );
    this.sdService.changeDate({
      period: 'day',
      date: this.selectedDate.date,
      createdAt: this.selectedDate.date,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });
    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }

  // when button this week is clicked
  thisweek() {
    this.selectedDate = Object.assign({}, this.currentDate);
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.selectedDate.firstDayOfFirstWeek,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.monthWeeks = range(
      this.selectedDate.firstWeek,
      this.selectedDate.lastWeek + 1
    );
    this.sdService.changeDate({
      period: 'week',
      date:
        'cw ' + this.selectedDate.currentWeek + ' ' + this.selectedDate.year,
      createdAt: this.selectedDate.date,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });
    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }

  thismonth() {
    this.selectedDate = Object.assign({}, this.currentDate);
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.selectedDate.firstDayOfFirstWeek,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.monthWeeks = range(
      this.selectedDate.firstWeek,
      this.selectedDate.lastWeek + 1
    );
    this.sdService.changeDate({
      period: 'month',
      createdAt: this.selectedDate.date,
      date: this.currentDate.monthtext + ' ' + this.currentDate.year,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });

    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }

  thisyear() {
    this.selectedDate = Object.assign({}, this.currentDate);
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.selectedDate.firstDayOfFirstWeek,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.monthWeeks = range(
      this.selectedDate.firstWeek,
      this.selectedDate.lastWeek + 1
    );
    this.sdService.changeDate({
      period: 'year',
      date: this.selectedDate.year.toString(),
      createdAt: this.selectedDate.date,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });

    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }

  weekClicked(weekNumber) {
    this.selectedDate.currentWeek = weekNumber;
    this.sdService.changeDate({
      period: 'week',
      date: 'cw ' + weekNumber + ' ' + this.selectedDate.year,
      createdAt: this.selectedDate.date,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });

    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }

  monthChanged(month) {
    this.selectedDate.month = this.months.indexOf(month);
    this.selectedDate.monthtext = month;
    this.selectedDate.firstWeek = this.arrangeData.getWeek(
      this.selectedDate.year,
      this.selectedDate.month,
      1
    );
    this.selectedDate.lastWeek = this.arrangeData.getWeek(
      this.selectedDate.year,
      this.selectedDate.month + 1,
      0
    );
    this.selectedDate.currentWeek = this.arrangeData.getWeek(
      this.selectedDate.year,
      this.selectedDate.month,
      this.selectedDate.currentDayOfMonth
    );
    this.selectedDate.date = `${this.selectedDate.currentDayOfMonth}-${this
      .selectedDate.month + 1}-${this.selectedDate.year}`;

    this.selectedDate.firstDayOfFirstWeek = this.arrangeData.toIsoWeekDay(
      new Date(this.selectedDate.year, this.selectedDate.month, 1).getDay()
    );
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.selectedDate.firstDayOfFirstWeek,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.monthWeeks = range(
      this.selectedDate.firstWeek,
      this.selectedDate.lastWeek + 1
    );
    this.sdService.changeDate({
      period: 'month',
      date: this.selectedDate.monthtext + ' ' + this.selectedDate.year,
      createdAt: this.selectedDate.date,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });

    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 500);
  }

  yearChanged(year) {
    this.selectedDate.year = year;
    this.selectedDate.firstWeek = this.arrangeData.getWeek(
      this.selectedDate.month,
      this.selectedDate.year,
      1
    );
    this.selectedDate.lastWeek = this.arrangeData.getWeek(
      this.selectedDate.year,
      this.selectedDate.month + 1,
      0
    );
    this.monthDays = this.arrangeData.getDaysInMonth(
      this.selectedDate.firstDayOfFirstWeek,
      this.selectedDate.month,
      this.selectedDate.year
    );
    this.monthWeeks = range(
      this.selectedDate.firstWeek,
      this.selectedDate.lastWeek + 1
    );
    this.sdService.changeDate({
      period: 'year',
      date: this.selectedDate.year.toString(),
      createdAt: this.selectedDate.date,
      month: this.selectedDate.month,
      year: this.selectedDate.year,
      week: this.selectedDate.currentWeek,
    });

    this.sdService.selectionChanged(true);
    setTimeout(() => this.sdService.selectionChanged(false), 1000);
  }
}
