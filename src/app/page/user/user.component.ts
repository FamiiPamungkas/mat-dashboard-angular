import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";
import {Breadcrumb} from "../../layout/component/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BasePage {
  static PAGE_TITLE: string = "Users";
  static AUTHORITY: string = "user-list";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users"),
  ];

  constructor(
    private navService: NavigationService
  ) {
    super(navService, UserComponent.AUTHORITY, UserComponent.PAGE_TITLE);
  }
}
