import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SelectedDate} from '../models/selectedDate.interface';
import {ArrangedataService} from './arrangedata.service';

@Injectable()
export class SelectedDateService {
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

  constructor(private arrangeData: ArrangedataService) {}

  private changedDateSource = new BehaviorSubject<boolean>(false);

  private selectedDateSource = new BehaviorSubject<SelectedDate>({
    period: 'month',
    date: this.months[new Date().getMonth()] + '-' + new Date().getFullYear(),
    // tslint:disable-next-line:radix
    month: new Date().getMonth(),
    // tslint:disable-next-line:radix
    year: new Date().getFullYear(),
    week: this.arrangeData.getWeek(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    createdAt: new Date()
      .toLocaleDateString('en-GB', {
        year: 'numeric',
        day: 'numeric',
        month: 'short',
      })
      .split(' ')
      .join('-'),
  });

  selectedDate = this.selectedDateSource.asObservable();
  changedDate = this.changedDateSource.asObservable();

  changeDate(date: SelectedDate) {
    this.selectedDateSource.next(date);
  }

  selectionChanged(changedDate: boolean) {
    this.changedDateSource.next(changedDate);
  }
}
