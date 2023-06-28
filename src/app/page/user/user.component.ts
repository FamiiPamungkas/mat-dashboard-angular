import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BasePage {
  static AUTHORITY: string = "user-list";

  constructor(navService: NavigationService) {
    super(UserComponent.AUTHORITY, navService);
  }
}
