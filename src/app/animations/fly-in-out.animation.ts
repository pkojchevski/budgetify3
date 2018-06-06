import {
  trigger,
  transition,
  style,
  keyframes,
  animate,
} from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  transition('void => *', [
    animate(
      200,
      keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)', offset: 1.0}),
      ])
    ),
  ]),
]);
