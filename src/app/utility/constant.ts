import {animate, state, style, transition, trigger} from "@angular/animations";

export function submenuToggleAnimation() {
  return trigger(
    'dropdownMenu', [
      state('closed', style({
        height: 0,
        opacity: 0,
      })),
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      transition("closed <=> open", animate("250ms ease-in-out"))
    ]
  )
}

export function rotateArrowAnimation() {
  return trigger(
    'rotateArrow', [
      state('closed', style({
        transform: 'rotate(0deg)' // Initial rotation
      })),
      state('open', style({
        transform: 'rotate(90deg)'
      })),
      transition("closed <=> open", animate("300ms ease-in-out"))
    ]
  )
}
