import {AfterViewInit, Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";
import {Breadcrumb} from "../../layout/component/breadcrumbs/breadcrumbs.component";
import {RequestService} from "../../service/request.service";
import {UserDTO} from "../../model/interfaces";
import {Router} from "@angular/router";
import {USERS_ENDPOINT} from "../../utility/constant";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BasePage implements AfterViewInit {
  static PAGE_TITLE: string = "Users";
  static AUTHORITY: string = "user-list";
  users: UserDTO[] = [];

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users"),
  ];

  constructor(
    private navService: NavigationService,
    private reqService: RequestService,
    private router: Router
  ) {
    super(navService, UserComponent.AUTHORITY, UserComponent.PAGE_TITLE);
  }

  ngAfterViewInit() {
    console.log("VIEW INITIATED")
    this.reqService.get(USERS_ENDPOINT).subscribe(res => {
      let users: UserDTO[] = res;
      this.users = users;
      for (let user of users) {
        console.log("USER =>" + user.firstname)
      }
    })
  }

  addUser() {
    this.router.navigateByUrl("/user-form").then(() => false);
  }
}
