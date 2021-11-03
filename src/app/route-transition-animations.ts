import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [transition('One => Two, Two => Three, One => Three', [   
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [style({ left: '300px', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('0.3s ease-out', style({ left: '-300px', opacity: 0 }))]),
          query(':enter', [animate('0.3s ease-out', style({ left: '0%', opacity: 1 }))])
         ]),
         query(':enter', animateChild()),
       ]),transition('Three => Two, Two => One, Three => One', [   
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [style({ left: '-300px', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('0.3s ease-out', style({ left: '300px', opacity: 0 }))]),
          query(':enter', [animate('0.3s ease-out', style({ left: '0%', opacity: 1 }))])
         ]),
         query(':enter', animateChild())
       ]),transition('Three => ThreeDetails, Two => TwoDetails, Three=>Add,ThreeDetails=> ThreeDetailsAddEdition', [   
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 }))]),
          query(':enter', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(0%)', opacity: 1 }))])
         ]),
         query(':enter', animateChild())
       ]),transition('ThreeDetails => Three, ThreeDetails => Two, ThreeDetails => one,TwoDetails => Three, TwoDetails => Two, TwoDetails => one,ThreeDetailsAddEdition=>Three, ThreeDetailsAddEdition=>Two, ThreeDetailsAddEdition=>One', [   
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(-100px)', opacity: 0 }))]),
          query(':enter', [animate('0.3s ease-out', style({ transform: 'perspective(500px) translateY(0px)', opacity: 1 }))])
         ]),
         query(':enter', animateChild())
       ])
    ])