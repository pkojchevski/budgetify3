import { Record } from '../models/record.interface';
import { SelectedDate } from '../models/selectedDate.interface';
import * as moment from 'moment';

export interface RecordsState {
  records: Record[];
  loaded: boolean;
  loading: boolean;
}

export const InitialRecordsState: RecordsState  = {
  records: [],
  loaded: false,
  loading: false
};

export interface SelectedDateState {
  selectedDate: SelectedDate;
}


export const InitialSelectedDateState: SelectedDateState = {
  selectedDate: {
    period: 'month',
    date: moment().format('MMMM-YYYY'),
    // tslint:disable-next-line:radix
    month: parseInt(moment().format('MM')),
     // tslint:disable-next-line:radix
    year: parseInt(moment().format('YYYY')),
    week: moment().isoWeek(),
    createdAt: moment().format('YYYY-MMM-DD')
   }
};


export interface AppState {
  recordsState: RecordsState;
  selectedDateState: SelectedDateState;
}

export const InitialAppState = {
  InitialSelectedDateState: InitialSelectedDateState,
  InitialRecordsState: InitialRecordsState
};
