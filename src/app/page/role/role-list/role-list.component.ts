import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {NavigationService} from "../../../service/navigation.service";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {ROLES_ENDPOINT} from "../../../utility/constant";
import {RequestService} from "../../../service/request.service";
import {RoleDTO} from "../../../model/interfaces";
import {faMagnifyingGlass, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends BasePage implements OnInit {
  static PAGE_TITLE: string = "Roles";
  static AUTHORITY: string = "user-role";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Roles"),
  ];

  detailIcon: IconDefinition = faMagnifyingGlass;

  roles: RoleDTO[] = []

  constructor(
    navService: NavigationService,
    private reqService: RequestService
  ) {
    super(navService, RoleListComponent.AUTHORITY, RoleListComponent.PAGE_TITLE);
  }

  ngOnInit() {
    this.fetchRoleList();
  }

  fetchRoleList() {
    let self = this;
    this.reqService.get(ROLES_ENDPOINT, undefined, {showAlert: true}).subscribe({
      next(res) {
        self.roles = res;
      }
    })
  }

}
