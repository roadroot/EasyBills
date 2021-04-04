import { trigger, state, style, transition, animate } from '@angular/animations';
export const fade =
  trigger('fade', [
    transition(':leave', [
      animate(200, style({ opacity: 0, transform: 'translateY(-100%)' })),
    ]),
    transition(':enter', [
      animate(0, style({ opacity: 0, transform: 'translateY(0%)' })),
      animate(300, style({ opacity: 1, transform: 'translateY(0%)' })),
    ])
  ]);
