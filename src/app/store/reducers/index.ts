import * as fromSelectedDate from './selectedDate.reducer.ts';
import {createSelector} from '@ngrx/store';
import * as fromRecords from './records.reducer.ts';

// export interface State {
//   selectedDate: fromSelectedDate.State;
//   records: fromRecords.State;
// }

export const reducer = {
  selectedDate: fromSelectedDate.reducer,
  records: fromRecords.reducer,
};

// export const getSelectedDateState = (state: State) => state.selectedDate;

// export const getDate = createSelector(getSelectedDateState, fromSelectedDate.getSelectedDate);

// export const getRecordsState = (state: State) => state.records;

// export const getRecordsForMonth = createSelector(getRecordsState, fromRecords.getRecordsForMonth);
