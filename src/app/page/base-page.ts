import {NavigationService} from "../service/navigation.service";

export class BasePage {
  _title?: string;

  /**
   * @var authority digunakan untuk menentukan navigasi mana yang aktif di sidenav
   * */
  constructor(
    protected navService: NavigationService,
    authority: string,
    title: string
  ) {
    navService.setActiveNav(authority);
    this.title = title
  }

  get title(): string {
    return this._title ?? "UNKNOWN";
  }

  set title(value: string) {
    this._title = value;
    this.navService.setPageTitle(this._title)
  }

  back() {
    window.history.back();
  }
}
