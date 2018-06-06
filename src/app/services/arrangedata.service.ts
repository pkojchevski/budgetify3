import {Injectable} from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class ArrangedataService {
  constructor() {}

  getDaysInMonth(d, m, y) {
    const emptyplaces = d > 1 ? ''.split.call(Array(d - 1), ',') : [];
    let arr;
    // months in JavaScript start at 0 so decrement by 1 e.g. 11 = Dec
    // --m;
    // if month is Sept, Apr, Jun, Nov return 30 days
    if (/8|3|5|10/.test(m)) {
      arr = Array.from(new Array(30), (val, index) => index + 1);
      console.log('arr:', arr);
    } else if (m !== 1) {
      arr = Array.from(new Array(31), (val, index) => index + 1);
    } else {
      // To get this far month must be Feb ( 1 )
      // if the year is a leap year then Feb has 29 days
      if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
        arr = Array.from(new Array(29), (val, index) => index + 1);
      } else {
        // Not a leap year. Feb has 28 days.
        arr = Array.from(new Array(28), (val, index) => index + 1);
      }
    }
    return emptyplaces.concat(arr);
  }

  getWeek(month, year, day) {
    const date = new Date(month, year, day);
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          (week1.getDay() + 6) % 7) /
          7
      )
    );
  }

  toIsoWeekDay(day: number): number {
    // tslint:disable-next-line:curly
    if (day === 0) return 7;
    // tslint:disable-next-line:curly
    else return day;
  }
}
