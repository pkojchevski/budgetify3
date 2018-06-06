import {Injectable} from '@angular/core';

import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import {User} from '../models/User.interface';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  isAuthenticated: Observable<Boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });

    // this.isAuthenticated = this.afAuth.authState.switchMap(user => {
    //   if (user) {
    //     // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     return Observable.of(true);
    //   } else {
    //     return Observable.of(null);
    //   }
    // });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  handleError(error) {
    console.log('error:', error);
  }

  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   return this.oAuthLogin(provider);
  // }

  // oAuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider).then(credentials => {
  //     console.log('credentials:', credentials);
  //     this.updateUserData(credentials.user);
  //   });
  // }

  // private updateUserData(user) {
  // sets user data to firestore on login

  // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //   `users/${user.uid}`
  // );

  //   const data: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //   };
  //   return userRef.set(data, {merge: true});
  // }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
