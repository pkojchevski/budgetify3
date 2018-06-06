import { style } from '@angular/animations';

export const swipeLeft = [
style({transform: 'translateX(0%)', offset: 0}),
style({transform: 'translateX(-20%)', offset: 1}),
];

export const swipeRight = [
  style({transform: 'translateX(0%)', offset: 0}),
  style({transform: 'translateX(20%)', offset: 1}),
  ];

  export const itemToLeft = [
    style({transform: 'translateX(-100%)', offset: 0}),
    style({transform: 'translateX(0)', offset: 1}),
  ]
