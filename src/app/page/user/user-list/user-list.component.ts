import {AfterViewInit, Component} from '@angular/core';
import {BasePage} from "../../base-page";
import {UserDTO} from "../../../model/interfaces";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {faMagnifyingGlass, faUserEdit, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {NavigationService} from "../../../service/navigation.service";
import {RequestService} from "../../../service/request.service";
import {Router} from "@angular/router";
import {USERS_ENDPOINT} from "../../../utility/constant";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BasePage implements AfterViewInit{
  static PAGE_TITLE: string = "Users";
  static AUTHORITY: string = "user-list";
  users: UserDTO[] = [];

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users"),
  ];

  editIcon: IconDefinition = faUserEdit;
  detailIcon: IconDefinition = faMagnifyingGlass;

  constructor(
    navService: NavigationService,
    private reqService: RequestService,
    private router: Router,
  ) {
    super(navService, UserListComponent.AUTHORITY, UserListComponent.PAGE_TITLE);
  }

  ngAfterViewInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    let self = this;
    this.reqService.get(USERS_ENDPOINT, undefined, {showAlert: true}).subscribe({
      next(res) {
        self.users = res;
      }
    })
  }

  addUser() {
    this.router.navigateByUrl("/users/add").then(() => false);
  }

  editUser(id: number) {
    this.router.navigateByUrl('/users/edit/' + id).finally();
  }

  detailUser(id:number) {
    this.router.navigateByUrl('/users/detail/' + id).finally();
  }
}
