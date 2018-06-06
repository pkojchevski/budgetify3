import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
  state,
} from '@angular/animations';

import * as moment from 'moment';
import {MessagingService} from './services/messaging.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger('routeState', [
  // //     transition('* => *', [
  // //       group([
  // //         query(':enter', [
  // //           style({
  // //             transform: 'translateX(-100%)',
  // //             opacity: 0
  // //           }),
  // //           animate('.2 s ease-out')
  // //         ], {optional: true}),
  // //         query(':leave', [
  // //           animate('.2s ease-out', style({
  // //             transform: 'translateX(100%)',
  // //             opacity: 0
  // //           }))
  // //         ], {optional: true})
  // //       ])
  // //     ])
  // //   ])
  //   state('void', style({position: 'fixed', width: '100%'}) ),
  //   state('*', style({position: 'fixed', width: '100%'}) ),
  //   transition(':enter', [  // before 2.1: transition('void => *', [
  //     style({transform: 'translateX(100%)'}),
  //     animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
  //   ]),
  //   transition(':leave', [  // before 2.1: transition('* => void', [
  //     style({transform: 'translateX(0%)'}),
  //     animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
  //   ])
  // ])
  //  ]
})
export class AppComponent implements OnInit {
  selection: string;

  constructor(private auth: AuthService, private msg: MessagingService) {}

  ngOnInit() {
    this.selection = moment().format('MMMM-YYYY');

    // tslint:disable-next-line:no-non-null-assertion
    this.auth.user$
      .filter(user => !!user)
      .take(1)
      .subscribe(user => {
        if (user) {
          this.msg.getPermission(user);
          this.msg.monitorRefresh(user);
          this.msg.receiveMessages();
        }
      });
  }

  // getAnimationData(outlet: RouterOutlet) {
  //   const routeData = outlet.activatedRouteData['animation'];
  //   if (!routeData) {
  //     return 'listPage';
  //   }
  //   return routeData['page'];
  // }
}
