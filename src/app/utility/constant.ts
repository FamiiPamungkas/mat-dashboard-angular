import {animate, state, style, transition, trigger} from "@angular/animations";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {environment} from "../../environments/environment";

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
export const BASE_API: string = environment.baseAPI;

export const AUTHENTICATE_ENDPOINT: string = "/v1/auth/authenticate";
export const REFRESH_TOKEN_ENDPOINT: string = "/v1/auth/refresh-token";

export const USERS_ENDPOINT: string = "/v1/users";

export const ROLES_ENDPOINT: string = "/v1/roles";
export const ROLE_OPTIONS_ENDPOINT: string = ROLES_ENDPOINT + "/options";
export const ROLE_USERS_ENDPOINT: string = ROLES_ENDPOINT + "/users";

export const MENUS_ENDPOINT: string = "/v1/menus";
export const MENUS_FOR_PARENT_ENDPOINT: string = MENUS_ENDPOINT + "/for-parent";
export const MENU_GROUPS: string = MENUS_ENDPOINT + "/groups";
export const MENU_ROLES_ENDPOINT: string = MENUS_ENDPOINT + "/roles";
export const MENU_TREE_ENDPOINT: string = MENUS_ENDPOINT + "/tree";
