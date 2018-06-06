import {Component, OnInit, Output} from '@angular/core';
import {sidemenuSlideAnimation} from '../animations';
import {EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from 'firebase';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  animations: [sidemenuSlideAnimation],
})
export class SidemenuComponent implements OnInit {
  message: string;
  @Output() messageEvent = new EventEmitter();
  user$: Observable<any>;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.user$.subscribe(console.log);
    console.log('ngOnInit');
  }

  hideMenu() {
    this.message = 'out';
    this.messageEvent.emit(this.message);
  }

  signOut() {
    this.auth.signOut();
    this.hideMenu();
  }
}
