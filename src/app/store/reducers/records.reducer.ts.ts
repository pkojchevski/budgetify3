// tslint:disable-next-line:quotemark
import { Action } from "@ngrx/store";
import { Record } from '../../models/record.interface';
import * as fromRecords from '../actions/records.actions';

import * as appState from '../app.states';


// export const initialState  = {
//   records: [],
//   loaded: false,
//   loading: false
// };

export function reducer (state: appState.RecordsState = appState.InitialRecordsState ,
                         action: fromRecords.Actions): appState.RecordsState {
  switch (action.type) {
    case fromRecords.LOAD_RECORDS_MONTH:
       return {
         ...state,
         loading: true
       };
    case fromRecords.LOAD_RECORDS_MONTH_FAIL:
       return {
         ...state,
         loading: false,
         loaded: false
       };
    case fromRecords.LOAD_RECORDS_MONTH_SUCCESS: {
      const records = action.payload;
      return {
        ...state,
        loaded: true,
        loading: false,
        records
      };
    }
    }
}


// export const getRecordsForMonth = (state: State) => state.records;
// export const getRecordsLoaded = (state: State) => state.loaded;
// export const getRecordsLoading = (state: State) => state.loading;



