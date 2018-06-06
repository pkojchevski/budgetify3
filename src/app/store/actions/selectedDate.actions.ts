import { Action } from '@ngrx/store';
import { SelectedDate } from '../../models/selectedDate.interface';


export const LOAD_SELECTED_DATE_ACTION = 'LOAD_SELECTED_DATA_ACTION';

export class LoadSelectedDateAction implements Action {
    readonly type = LOAD_SELECTED_DATE_ACTION;

    constructor(public payload?: SelectedDate) {
    }
  }

  export type Actions = LoadSelectedDateAction;
