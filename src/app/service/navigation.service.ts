import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _activeNav: string = "";
  private activeNav: Subject<string> = new Subject<string>();

  constructor() {
  }

  setActiveNav(value: string) {
    this._activeNav = value;
    this.activeNav.next(this._activeNav);
  }

  getActiveNav(): Observable<string> {
    return this.activeNav.asObservable();
  }
}
