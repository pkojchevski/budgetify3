import { Action } from '@ngrx/store';
import { Record } from '../../models/record.interface';

export const LOAD_RECORDS_MONTH = 'LOAD_RECORDS_MONTH';
export const LOAD_RECORDS_MONTH_FAIL = 'LOAD_RECORDS_MONTH_FAIL';
export const LOAD_RECORDS_MONTH_SUCCESS = 'LOAD_RECORDS_MONTH_SUCCESS';

export const LOAD_RECORDS_WEEK = 'LOAD_RECORDS_WEEK';
export const LOAD_RECORDS_YEAR = 'LOAD_RECORDS_YEAR';
export const LOAD_RECORDS_DAY = 'LOAD_RECORDS_DAY';
export const RECORDS_FOR_MONTH_LOADED = 'RECORDS_FOR_MONTH_LOADED';



export class LoadRecordsForMonth implements Action {
  readonly type = LOAD_RECORDS_MONTH;

  constructor(public payload: number) {}
}

export class LoadRecordsForMonthFail implements Action {
  readonly type = LOAD_RECORDS_MONTH_FAIL;

   constructor(public payload?: string) {}
}

export class LoadRecordsForMonthSuccess implements Action {
  readonly type = LOAD_RECORDS_MONTH_SUCCESS;

  constructor(public payload?: Record[] ) {}
}


export type Actions = LoadRecordsForMonth | LoadRecordsForMonthFail | LoadRecordsForMonthSuccess;
