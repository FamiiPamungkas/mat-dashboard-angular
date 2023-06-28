import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BasePage {
  static AUTHORITY: string = "user-menu";

  constructor(navService: NavigationService) {
    super(MenuComponent.AUTHORITY, navService);
  }
}
