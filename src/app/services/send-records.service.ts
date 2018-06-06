import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Category} from '../models/category.interface';

@Injectable()
export class SendRecordsService {
  private category: Category;
  private recordSource = new BehaviorSubject<Category>(this.category);

  currentRecord = this.recordSource.asObservable();

  newRecord(rec: Category) {
    this.recordSource.next(rec);
  }

  constructor() {}
}
