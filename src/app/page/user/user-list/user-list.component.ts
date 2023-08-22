import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {Page, UserDTO} from "../../../model/interfaces";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {faMagnifyingGlass, faUserEdit, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {NavigationService} from "../../../service/navigation.service";
import {RequestService} from "../../../service/request.service";
import {ROLE_OPTIONS_ENDPOINT, USER_PAGES_ENDPOINT} from "../../../utility/constant";
import {SimplyOption, User} from "../../../model/classes-implementation";
import {SELECT_ALL} from "../../../utility/label";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BasePage implements OnInit {
  static PAGE_TITLE: string = "Users";
  static AUTHORITY: string = "user-list";
  users: UserDTO[] = [];
  roleOptions: SimplyOption[] = [];

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users"),
  ];

  filters = {
    search: "",
    roleId: "",
    status: ""
  }

  editIcon: IconDefinition = faUserEdit;
  detailIcon: IconDefinition = faMagnifyingGlass;

  constructor(
    navService: NavigationService,
    private reqService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(navService, UserListComponent.AUTHORITY, UserListComponent.PAGE_TITLE);
    this.route.queryParams.subscribe((params) => {
      this.filters.search = params['search'] || '';
      this.filters.roleId = params['roleId'] || '';
      this.filters.status = params['status'] || '';
    });

  }

  ngOnInit(): void {
    this.fetchRoleOptions();
    this.fetchUserList();
  }

  private fetchRoleOptions() {
    this.reqService.get(ROLE_OPTIONS_ENDPOINT, undefined, {showAlert: true}).subscribe(res => {
      this.roleOptions = res;
    })
  }

  fetchUserList() {
    let self = this;
    const queryParams = new HttpParams()
      .set('search', this.filters.search)
      .set('roleId', this.filters.roleId)
      .set('status', this.filters.status);

    this.reqService.get(`${USER_PAGES_ENDPOINT}?${queryParams.toString()}`, undefined, {showAlert: true}).subscribe({
      next(res: Page<User>) {
        self.users = res.content;
      }
    })
  }

  submitFilters() {
    const queryParams = this.filters;

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: "merge"
    }).finally();

    this.fetchUserList();
  }

  protected readonly SELECT_ALL = SELECT_ALL;
}
