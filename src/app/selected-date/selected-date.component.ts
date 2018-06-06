import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import * as moment from 'moment';
import {Store} from '@ngrx/store';
import * as fromDate from '../store/actions/selectedDate.actions';

import 'rxjs/add/operator/skip';
import {SelectedDate} from '../models/selectedDate.interface';
import {Observable} from 'rxjs/Observable';
import * as fromReducer from '../store/reducers';

import {take} from 'rxjs/operator/take';
import * as fromSelectedDateState from '../store/reducers/selectedDate.reducer.ts';
import {SelectedDateService} from '../services/selectedDate.service';
import {AuthService} from '../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'selected-date',
  templateUrl: './selected-date.component.html',
  styleUrls: ['./selected-date.component.scss'],
})
export class SelectedDateComponent implements OnInit {
  selectedDate$: Observable<SelectedDate>;
  selectionChanged$: Observable<boolean>;

  isAuthorized$: Observable<boolean>;

  constructor(
    private sdService: SelectedDateService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.isAuthorized$ = this.auth.user$.map(user => !!user);

    this.selectedDate$ = this.sdService.selectedDate;
    this.selectionChanged$ = this.sdService.changedDate;
  }
}
