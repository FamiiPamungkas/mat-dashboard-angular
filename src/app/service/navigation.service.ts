import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Title} from "@angular/platform-browser";
import {APP_NAME} from "../utility/constant";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _activeNav: string = "";
  private activeNav: Subject<string> = new Subject<string>();

  constructor(
    private title: Title
  ) {
  }

  setActiveNav(value: string) {
    this._activeNav = value;
    this.activeNav.next(this._activeNav);
  }

  setPageTitle(title: string) {
    this.title.setTitle(`${APP_NAME} | ${title}`);
  }

  getActiveNav(): Observable<string> {
    return this.activeNav.asObservable();
  }
}
