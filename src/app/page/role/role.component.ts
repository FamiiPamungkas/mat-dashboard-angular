import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends BasePage {
  static AUTHORITY: string = "user-role";

  constructor(navService: NavigationService) {
    super(RoleComponent.AUTHORITY, navService);
  }
}
