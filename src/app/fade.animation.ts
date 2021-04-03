import { trigger, state, style, transition, animate } from '@angular/animations';
export let fade = trigger('fade', [
  state('open', style({ opacity: 1 })),
  state('close', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate(4000)
  ]),
  transition('open, close', [
    animate(4000)
  ]),
  transition('close, open', [
    animate(4000)
  ])
]);
