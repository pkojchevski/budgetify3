import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import * as kf from './keyframes';

export const itemAnimation = trigger('itemAnimation', [
  state(
    'slideLeft',
    style({
      'margin-left': '-20%',
    })
  ),
  state(
    'slideRight',
    style({
      'margin-left': '0',
    })
  ),
  transition('* => slideLeft', animate(200, keyframes(kf.swipeLeft))),
  transition('slideLeft => slideRight', animate(200, keyframes(kf.swipeRight))),
]);
