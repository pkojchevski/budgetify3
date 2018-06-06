import { Action } from '@ngrx/store';
import * as moment from 'moment';
import { SelectedDate } from '../../models/selectedDate.interface';
import * as selectedDateActions from '../actions/selectedDate.actions';


export interface State {
  selectedDate: SelectedDate;
}


export const initialState: State = {
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


export function reducer(state: State = initialState,
                        action: selectedDateActions.Actions): State {
  // console.log('action:' + JSON.stringify(action));
    switch (action.type) {
      case selectedDateActions.LOAD_SELECTED_DATE_ACTION: {
        const selectedDate = action.payload;
        console.log('payload:', action.payload);
        return {
          selectedDate
      };
      }

      }
}

export const getSelectedDate = (state: State) => state.selectedDate;

