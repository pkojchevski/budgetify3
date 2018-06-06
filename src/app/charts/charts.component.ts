import { Component, OnInit } from '@angular/core';
import { slideInOutAnimations } from '../animations/index';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  animations: [slideInOutAnimations],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@slideInOutAnimations]': ''}
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



}
