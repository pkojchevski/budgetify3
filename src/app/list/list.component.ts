import {Component, OnInit} from '@angular/core';
import {Record} from '../models/record.interface';
import {Observable} from 'rxjs/Observable';
import {RecordService} from '../services/record.service';
import {Store} from '@ngrx/store';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {SelectedDate} from '../models/selectedDate.interface';
import {SelectedDateService} from '../services/selectedDate.service';
import {
  trigger,
  transition,
  animate,
  keyframes,
  state,
  style,
} from '@angular/animations';

import * as kf from '../animations/keyframes';
import {slideInOutAnimations} from '../animations/index';
import {itemAnimation} from '../animations/index';
import {flyInOut} from '../animations/index';
import {Router} from '@angular/router';
import {SendRecordsService} from '../services/send-records.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [slideInOutAnimations, itemAnimation, flyInOut],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@slideInOutAnimations]': ''},
})
export class ListComponent implements OnInit {
  records: Record[] = [];
  recordsAnim: Record[] = [];
  selectedDate: SelectedDate;
  animationState = [];
  itemState = [];
  next = 1;
  noRecords = false;
  expanded: number;
  expandedList: {[index: number]: Record[]} = {};
  // expandedList: Array<any>;
  constructor(
    private recordService: RecordService,
    private sdService: SelectedDateService,
    private router: Router,
    private sendRecordService: SendRecordsService
  ) {}

  // animation of list items
  doNext() {
    if (this.next < this.records.length) {
      this.recordsAnim.push(this.records[this.next++]);
    }
  }

  // --------------------- animation of slide to delete animation
  slide(animstate: string, id: number) {
    if (this.selectedDate.period !== 'day') {
      return;
    }
    this.animationState[id] = animstate;
  }

  // --------------------------------

  ngOnInit() {
    this.sdService.selectedDate.subscribe(data => (this.selectedDate = data));
    console.log('selectedDate:', this.selectedDate);
    switch (this.selectedDate.period) {
      case 'month': {
        return this.recordService
          .getRecordsForMonth(this.selectedDate.month)
          .subscribe(data => {
            // tslint:disable-next-line:curly
            if (data.length === 0) {
              this.noRecords = true;
              return;
            }
            this.records = this.recordService
              .arrangeData(data, 'name')
              .sort((a, b) => b.income - a.income || b.value - a.value);
            this.recordService.changeRecords(this.records);
            this.recordsAnim.push(this.records[0]);
          });
      }
      case 'week': {
        this.recordsAnim = [];
        return this.recordService
          .getRecordsForWeek(this.selectedDate.week)
          .subscribe(data => {
            this.records = [];
            this.recordsAnim = [];
            // tslint:disable-next-line:curly
            if (data.length === 0) {
              this.noRecords = true;
              return;
            }
            this.records = this.recordService
              .arrangeData(data, 'name')
              .sort((a, b) => b.income - a.income || b.value - a.value);
            this.recordService.changeRecords(this.records);
            // this.recordsAnim = [];
            this.recordsAnim.push(this.records[0]);
          });
      }
      case 'year': {
        this.recordsAnim = [];
        // tslint:disable-next-line:curly

        return this.recordService
          .getRecordsForYear(this.selectedDate.year)
          .subscribe(data => {
            // tslint:disable-next-line:curly
            if (data.length === 0) {
              this.noRecords = true;
              return;
            }
            this.records = this.recordService
              .arrangeData(data, 'name')
              .sort((a, b) => b.income - a.income || b.value - a.value);
            this.recordService.changeRecords(this.records);
            this.recordsAnim.push(this.records[0]);
          });
      }
      case 'day': {
        this.recordsAnim = [];
        return this.recordService
          .getRecordsForDay(this.selectedDate.createdAt)
          .subscribe(data => {
            console.log('data:', data);
            // tslint:disable-next-line:curly
            if (data.length === 0) {
              this.noRecords = true;
              return;
            }
            this.records = this.recordService
              .arrangeData(data, 'name')
              .sort((a, b) => b.income - a.income || b.value - a.value);
            this.recordService.changeRecords(this.records);
            this.recordsAnim.push(this.records[0]);
            this.recordsAnim.sort(
              (a, b) => Number(b.income) - Number(a.income) || b.value - a.value
            );
          });
      }
    }
  }

  deleteItem(id) {
    this.recordsAnim.forEach((el, i) => {
      if ((el.recordId = id)) {
        this.recordsAnim.splice(i, 1);
        this.animationState[i] = 'slideRight';
      }
    });
    this.recordService.deleteRecord(id).catch(err => console.log(err));
  }

  goToRecords(rec: Record) {
    this.sendRecordService.newRecord({
      name: rec.name,
      img: rec.img,
      income: rec.income,
    });
    this.router.navigate(['/records']);
  }

  expandItem(index: number, rec: Record) {
    rec.expanded = !rec.expanded;
    // tslint:disable-next-line:curly
    if (!rec.expanded) return;

    this.recordService
      .getRecordsForCurrentMonthByName(rec.name, rec.month)
      .subscribe(data => (this.expandedList[index] = data));
  }
}
