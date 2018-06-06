import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

import {Record} from '../models/record.interface';
import {SelectedDate} from '../models/selectedDate.interface';
import {Observable} from 'rxjs/Observable';
import {RecordDate} from '../models/recordDate.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class RecordService {
  selectedDate: SelectedDate;
  recordscollection: AngularFirestoreCollection<Record>;

  constructor(private afs: AngularFirestore) {
    this.recordscollection = afs.collection('records');
  }

  recordsSource = new BehaviorSubject([]);
  records = this.recordsSource.asObservable();

  changeRecords(records: Record[]) {
    this.recordsSource.next(records);
  }

  getAllRecords() {
    return this.recordscollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Record;
        data.recordId = a.payload.doc.id;
        return data;
      });
    });
  }
  getRecordsForMonth(month: number) {
    // tslint:disable-next-line:max-line-length
    return this.afs
      .collection('records', ref => ref.where('month', '==', month))
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Record;
          data.recordId = a.payload.doc.id;
          return data;
        });
      });
  }

  getRecordsForWeek(week) {
    // tslint:disable-next-line:max-line-length
    return this.afs
      .collection('records', ref => ref.where('week', '==', week))
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Record;
          data.recordId = a.payload.doc.id;
          return data;
        });
      });
  }

  getRecordsForYear(year) {
    // tslint:disable-next-line:max-line-length
    return this.afs
      .collection('records', ref => ref.where('year', '==', year))
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Record;
          data.recordId = a.payload.doc.id;
          return data;
        });
      });
  }

  getRecordsForDay(createdAt: string) {
    console.log('get records for day');
    // tslint:disable-next-line:max-line-length
    return (
      this.afs
        .collection('records', ref => ref.where('createdAt', '==', createdAt))
        // .valueChanges();
        .snapshotChanges()
        .map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Record;
            data.recordId = a.payload.doc.id;
            return data;
          });
        })
    );
  }

  arrangeData(arr, period) {
    // console.log('srr:', JSON.stringify(arr));
    if (arr.length !== 0) {
      return arr.reduce(function(o, cur) {
        // Get the index of the key-value pair.
        //  console.log('o:' + JSON.stringify(o));
        const occurs = o.reduce(function(n, item, i) {
          return item[period] === cur[period] ? i : n;
        }, -1);
        // console.log('occurs:' + JSON.stringify(occurs));
        // If the name is found,
        if (occurs >= 0) {
          // append the current value to its list of values.
          // tslint:disable-next-line:radix
          o[occurs].value = parseInt(o[occurs].value) + parseInt(cur.value);
          // Otherwise,
        } else {
          // add the current item to o (but make sure the value is an array).
          const obj = {
            name: cur.name,
            value: cur.value,
            img: cur.img,
            details: cur.details,
            income: cur.income,
            createdAt: cur.createdAt,
            week: cur.week,
            year: cur.year,
            month: cur.month,
            recordId: cur.recordId,
            expanded: false,
          };
          o = o.concat([obj]);
        }
        return o;
      }, []);
    } else {
      return [];
    }
  }

  addRecord(record: Record) {
    this.recordscollection.add({...record});
  }

  // setSelectedDate(date: SelectedDate) {
  //    this.selectedDate = date;
  // }

  // getSelectedDate () {
  //    return this.selectedDate;
  // }

  deleteRecord(recordId) {
    return this.afs.doc(`records/${recordId}`).delete();
  }

  getRecordsForCurrentMonthByName(name: string, month: number) {
    return this.afs
      .collection('records', ref =>
        ref.where('month', '==', month).where('name', '==', name)
      )
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Record;
          data.recordId = a.payload.doc.id;
          console.log('data:', data);
          return data;
        });
      });
  }
}
