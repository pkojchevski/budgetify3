import {Component, OnInit} from '@angular/core';
import {PkModalService} from './pk-modal.service';

import {CATEGORY} from '../models/category';
import {Category} from '../models/category.interface';

import {merge} from 'lodash';
import {Record} from '../models/record.interface';
import {Store} from '@ngrx/store';
import {RecordService} from '../services/record.service';
import {Router} from '@angular/router';
import {SelectedDate} from '../models/selectedDate.interface';
import {SelectedDateService} from '../services/selectedDate.service';
import {RecordDate} from '../models/recordDate.interface';
import {isEmpty} from 'lodash/';
import {slideInOutAnimations} from '../animations/index';
import {SendRecordsService} from '../services/send-records.service';

@Component({
  moduleId: module.id.toString(),
  // tslint:disable-next-line:component-selector
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  animations: [slideInOutAnimations],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@slideInOutAnimations]': ''},
})
export class RecordComponent implements OnInit {
  result = '0';
  details;
  addIsClicked: Boolean = false;
  ignoreDoubleClick = false;
  completeDelete = false;
  negativeNumber = false;
  categories = [];
  id: string;
  selectedCategory: Category;
  record: Record;
  selectedDate: SelectedDate;
  recordDate = {};
  // tslint:disable-next-line:no-inferrable-types
  // saveBtnDisabled: boolean = true;
  saveClicked = false;
  passedRecord: Record;

  constructor(
    private modalService: PkModalService,
    private recordService: RecordService,
    private router: Router,
    private sdService: SelectedDateService,
    private sendRecordService: SendRecordsService
  ) {}

  ngOnInit() {
    if (this.sendRecordService.currentRecord) {
      this.sendRecordService.currentRecord.subscribe(data => {
        // tslint:disable-next-line:curly
        if (isEmpty(data)) return;
        this.selectedCategory = data;
      });
    }
    this.sdService.selectedDate.subscribe(data => (this.selectedDate = data));
    this.categories = CATEGORY;
  }

  clicked(arg) {
    this.ignoreDoubleClick = false;
    // tslint:disable-next-line:radix
    if (this.result === '0') {
      this.result = arg;
      // this.saveBtnDisabled =
      //   isEmpty(this.selectedCategory) &&
      //   (this.result === '0' || Number.isInteger(parseInt(this.result, 10)));
      // console.log(this.saveBtnDisabled);
    } else {
      this.result = this.result + arg;
      // this.saveBtnDisabled =
      //   isEmpty(this.selectedCategory) &&
      //   (this.result === '0' || Number.isInteger(parseInt(this.result, 10)));
      // console.log(this.saveBtnDisabled);
    }
  }

  delete() {
    this.negativeNumber = false;
    this.ignoreDoubleClick = false;
    // tslint:disable-next-line:curly
    if (this.result === '0') return;
    // tslint:disable-next-line:curly
    // tslint:disable-next-line:whitespace
    if (this.completeDelete) {
      this.completeDelete = false;
      this.result = '0';
    } else {
      const arr = this.result.split('');
      // tslint:disable-next-line:radix
      // tslint:disable-next-line:curly
      if (arr.length === 1) {
        this.result = '0';
      } else {
        // tslint:disable-next-line:radix
        this.result = arr.splice(0, arr.length - 1).join('');
      }
    }
    // this.saveBtnDisabled =
    //   isEmpty(this.selectedCategory) || this.result === '0';
  }

  add() {
    if (this.result === '0') {
      return;
    }
    // tslint:disable-next-line:curly
    if (this.ignoreDoubleClick) {
      this.playAudio('kick');
      return;
    }
    this.addIsClicked = true;
    this.result = this.result + ' + ';
    this.ignoreDoubleClick = true;
    // this.saveBtnDisabled = true;
  }

  equal() {
    this.completeDelete = true;
    const arr = this.result.split(' ');
    this.result = arr.reduce((acc, curr, ind) => {
      if (ind % 2 !== 0) {
        if (arr[ind] === '+') {
          // tslint:disable-next-line:radix
          acc = (parseInt(acc) + parseInt(arr[ind + 1])).toString();
        }
        if (arr[ind] === '-') {
          // tslint:disable-next-line:radix
          acc = (parseInt(acc) - parseInt(arr[ind + 1])).toString();
        }
      }
      return acc;
    });

    // tslint:disable-next-line:radix
    if (parseInt(this.result) < 0) {
      this.negativeNumber = true;
      this.playAudio('kick');
      // this.saveBtnDisabled = true;
      this.result = '0';
    }
    // this.saveBtnDisabled =
    //   isEmpty(this.selectedCategory) || this.result === '0';
  }

  minus() {
    if (this.result === '0') {
      return;
    }
    // tslint:disable-next-line:curly
    if (this.ignoreDoubleClick) {
      this.playAudio('kick');
      return;
    }
    this.result = this.result + ' - ';
    this.ignoreDoubleClick = true;
    // this.saveBtnDisabled = true;
  }

  save(details) {
    if (
      Number.isInteger(parseInt(this.result, 10)) &&
      parseInt(this.result, 10) > 0 &&
      !isEmpty(this.selectedCategory)
    ) {
      this.saveClicked = true;
      this.recordDate['createdAt'] = this.selectedDate.createdAt;
      this.recordDate['month'] = this.selectedDate.month;
      this.recordDate['week'] = this.selectedDate.week;
      this.recordDate['year'] = this.selectedDate.year;
      // tslint:disable-next-line:radix
      this.record = Object.assign(
        {},
        this.recordDate,
        // tslint:disable-next-line:radix
        {value: parseInt(this.result)},
        {details: details},
        this.selectedCategory
      );
      this.recordService.addRecord(this.record);
      // tslint:disable-next-line:curly
      if (this.record.income) this.playAudio('cash');
      setTimeout(() => this.reset(), 500);
    } else {
      this.playAudio('kick');
    }
  }

  saveWrapperLinkClicked() {
    // tslint:disable-next-line:curly
    // if (this.saveBtnDisabled) this.playAudio('kick');
  }

  openModal(id) {
    this.modalService.open(id);
    this.id = id;
  }

  choosedCategory(c) {
    setTimeout(() => {
      this.modalService.close(this.id);
    }, 500);
    this.selectedCategory = c;
    // this.saveBtnDisabled =
    //   isEmpty(this.selectedCategory) || this.result === '0';
  }

  reset() {
    this.result = undefined;
    this.selectedCategory = undefined;
    this.router.navigateByUrl('/list');
  }

  playAudio(name) {
    const audio = new Audio();
    audio.src = '../../assets/audio/' + name + '.wav';
    audio.load();
    audio.play();
  }
}
