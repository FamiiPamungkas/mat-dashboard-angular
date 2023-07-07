import {NavigationService} from "../service/navigation.service";

export class BasePage {
  _title?: string;

  constructor(
    navService: NavigationService,
    authority: string,
    title: string
  ) {
    navService.setActiveNav(authority);
    navService.setPageTitle(title);
    this.title = title
  }

  get title(): string {
    return this._title ?? "UNKNOWN";
  }

  set title(value: string) {
    this._title = value;
  }

}
