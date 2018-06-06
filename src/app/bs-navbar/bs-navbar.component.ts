import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/User.interface';
import {sidemenuSlideAnimation} from '../animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
  animations: [sidemenuSlideAnimation],
})
export class BsNavbarComponent implements OnInit {
  activated: Boolean = false;
  user$: Observable<User>;
  isAuthorized$: Observable<boolean>;
  menuState = 'out';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.isAuthorized$ = this.auth.user$.map(user => !!user);
  }

  // activation for animation class
  clicked(e) {
    this.activated = true;
  }

  showMenu() {
    this.menuState = 'in';
  }

  receiveMessage($event) {
    this.menuState = $event;
  }
}
