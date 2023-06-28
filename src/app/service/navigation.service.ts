import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _activeNav: string = "";

  constructor() {
  }

  set activeNav(value: string) {
    this._activeNav = value;
  }

  get activeNav(): string {
    return this._activeNav;
  }
}
