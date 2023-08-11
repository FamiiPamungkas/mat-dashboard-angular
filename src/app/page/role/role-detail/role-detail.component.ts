import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {NavigationService} from "../../../service/navigation.service";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {BaseResponse, RoleDTO} from "../../../model/interfaces";
import {Role, User} from "../../../model/classes-implementation";
import {isValidNumber} from "../../../utility/utility";
import {MatDialogRef} from "@angular/material/dialog";
import {ROLE_USERS_ENDPOINT, ROLES_ENDPOINT} from "../../../utility/constant";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../../service/request.service";
import {AlertDialogService} from "../../../service/alert-dialog.service";

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent extends BasePage implements OnInit {
  static PAGE_TITLE: string = "Role Detail";
  static AUTHORITY: string = "user-role";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Roles", "/roles"),
    new Breadcrumb("Role Detail"),
  ];

  roleId: number = 0;
  role: RoleDTO = new Role();
  roleUsers: User[] = [];

  constructor(
    navService: NavigationService,
    private activeRoute: ActivatedRoute,
    private reqService: RequestService,
    private alertService: AlertDialogService,
    private router: Router
  ) {
    super(navService, RoleDetailComponent.AUTHORITY, RoleDetailComponent.PAGE_TITLE);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if (id && isValidNumber(id)) {
        this.roleId = id;
        this.fetchRoleData(this.roleId);
      } else {
        const dialog: MatDialogRef<any> = this.alertService.showError("Invalid role id", `The provided role ID [${id}] is not valid.`);
        dialog.afterClosed().subscribe(() => {
          this.router.navigateByUrl("/roles").finally();
        });
      }
    });
  }

  fetchRoleData(id: number) {
    let self = this;
    this.reqService.get(ROLES_ENDPOINT + "/" + id)
      .subscribe({
        next(res: Role) {
          self.role = res;
          self.role.menus.sort((a, b) => a.seq - b.seq);
          console.log("role ", self.role)
          self.fetchRoleUsers();
        },
        error(error) {
          const res: BaseResponse = error.error;
          const dialog: MatDialogRef<any> = self.alertService.showError("Role not found", res.message);
          dialog.afterClosed().subscribe(() => {
            return self.router.navigateByUrl("/roles");
          })
        }
      })
  }

  fetchRoleUsers() {
    let self = this;
    this.reqService.get(
      `${ROLE_USERS_ENDPOINT}/${this.roleId}`,
      undefined,
      {showAlert: true}
    ).subscribe({
      next(res: User[]) {
        self.roleUsers = res;
        console.log("ROLE USERS ",res)
      }
    })
  }


}
