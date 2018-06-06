import { Injectable } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as recordsActions from '../actions/records.actions';

@Injectable()

export class LoadRecordsEffects {

  constructor(private recordService: RecordService, private actions$: Actions ) {

  }

  // @Effect()
  // records$ = this.actions$.ofType(recordsActions.LOAD_RECORDS_MONTH).pipe(
  //     switchMap(() => {
  //         return this.recordService.getRecordsForMonth(2).pipe(
  //             map(records => new recordsActions.LoadRecordsForMonthSuccess(records:any)),
  //             catchError(error => of(new recordsActions.LoadRecordsForMonthFail(error)))
  //     );
  //     })
  //   );




}
