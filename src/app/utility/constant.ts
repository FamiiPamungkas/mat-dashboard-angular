import {animate, state, style, transition, trigger} from "@angular/animations";

export function dropdownAnimation() {
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

export const TOKEN_KEY: string = "TOKEN";
export const REFRESH_TOKEN_KEY: string = "REFRESH_TOKEN";
export const AUTH_USER_KEY: string = "AUTH_USER";

export const API_URL: string = "http://localhost:8088";
