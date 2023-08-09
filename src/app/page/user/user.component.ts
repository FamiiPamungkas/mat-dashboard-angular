import {AfterViewInit, Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";
import {Breadcrumb} from "../../layout/component/breadcrumbs/breadcrumbs.component";
import {RequestService} from "../../service/request.service";
import {UserDTO} from "../../model/interfaces";
import {Router} from "@angular/router";
import {USERS_ENDPOINT} from "../../utility/constant";
import {faTrashCan, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {NotificationService} from "../../service/notification.service";
import {AppNotification} from "../../model/classes-implementation";

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

  deleteIcon: IconDefinition = faTrashCan;

  constructor(
    private navService: NavigationService,
    private reqService: RequestService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    super(navService, UserComponent.AUTHORITY, UserComponent.PAGE_TITLE);
  }

  ngAfterViewInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    let self = this;
    this.reqService.get(USERS_ENDPOINT,undefined,{showAlert:true}).subscribe({
      next(res) {
        self.users = res;
      }
    })
  }

  addUser() {
    this.router.navigateByUrl("/user-form").then(() => false);
  }

  deleteUser(id: number) {
    let self = this;
    this.reqService.post(USERS_ENDPOINT + "/" + id, null, {method: "delete", showAlert: true}).subscribe({
      next() {
        self.notificationService.addNotification(
          new AppNotification(
            "success",
            "Delete Success",
            "User has been successfully deleted"
          )
        )
        self.fetchUserData();
      }
    })
  }
}
