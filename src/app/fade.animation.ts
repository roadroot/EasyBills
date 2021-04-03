import { trigger, state, style, transition, animate } from '@angular/animations';
export let fade = trigger('fade', [
  state('hidden', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate(4000)
  ])
]);
