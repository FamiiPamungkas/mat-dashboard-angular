import {NavigationService} from "../service/navigation.service";

export class BasePage {

  constructor(
    authority: string,
    navService: NavigationService
  ) {
    navService.setActiveNav(authority);
  }


}
