import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class MessagingService {
  private messaging = firebase.messaging();
  private messageSource = new Subject();

  currentMessage = this.messageSource.asObservable();

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  // get permission to send messages
  getPermission(user) {
    this.messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.saveToken(user, token);
      })
      .catch(err => console.log('Unable to get permission to notify', err));
  }

  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging
        .getToken()
        .then(refreshedToken => {
          console.log('token refreshed');
          this.saveToken(user, refreshedToken);
        })
        .catch(err => console.log(err));
    });
  }

  private saveToken(user, token): void {
    const currentTokens = user.fcmTokens || {};
    // if tokens does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('users').doc(user.uid);
      const tokens = {...currentTokens, [token]: true};
      userRef.update({fcmTokens: tokens});
    }
  }

  receiveMessages() {
    this.messaging.onMessage(payload => {
      console.log('Message received', payload);
      this.messageSource.next(payload);
    });
  }
}
