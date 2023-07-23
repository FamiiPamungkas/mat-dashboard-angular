import {animate, state, style, transition, trigger} from "@angular/animations";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

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

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  if (password?.value != confirmPassword?.value) {
    return {passwordMismatch: true};
  }
  return null;
}


export const TOKEN_KEY: string = "TOKEN";
export const REFRESH_TOKEN_KEY: string = "REFRESH_TOKEN";
export const AUTH_USER_KEY: string = "AUTH_USER";

export const APP_NAME: string = "FamiPam";
export const BASE_URL: string = "http://localhost:8088";
export const BASE_API: string = BASE_URL + "/api";

export const USERS_ENDPOINT: string = "/v1/users";
