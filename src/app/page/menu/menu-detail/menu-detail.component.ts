import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../../service/request.service";
import {AlertDialogService} from "../../../service/alert-dialog.service";
import {isValidNumber} from "../../../utility/utility";
import {MatDialogRef} from "@angular/material/dialog";
import {Menu, Role, User} from "../../../model/classes-implementation";
import {MENU_ROLES_ENDPOINT, MENUS_ENDPOINT, ROLE_USERS_ENDPOINT, ROLES_ENDPOINT} from "../../../utility/constant";
import {BaseResponse} from "../../../model/interfaces";

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent extends BasePage implements OnInit {
  static PAGE_TITLE: string = "Menu Detail";
  static AUTHORITY: string = "user-menu";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Menus", "/menus"),
    new Breadcrumb("Menu Detail"),
  ];

  menuId: number = 0;
  menu: Menu = new Menu();
  menuRoles: Role[] = [];

  constructor(
    navService: NavigationService,
    private activeRoute: ActivatedRoute,
    private reqService: RequestService,
    private alertService: AlertDialogService,
    private router: Router
  ) {
    super(navService, MenuDetailComponent.AUTHORITY, MenuDetailComponent.PAGE_TITLE);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if (id && isValidNumber(id)) {
        this.menuId = id;
        this.fetchMenuData(this.menuId);
      } else {
        const dialog: MatDialogRef<any> = this.alertService.showError("Invalid role id", `The provided role ID [${id}] is not valid.`);
        dialog.afterClosed().subscribe(() => {
          this.router.navigateByUrl("/roles").finally();
        });
      }
    });
  }

  fetchMenuData(id: number) {
    let self = this;
    this.reqService.get(`${MENUS_ENDPOINT}/${id}`)
      .subscribe({
        next(res: Menu) {
          self.menu = res;
          console.log("menu ", self.menu)
          self.fetchMenuRoles();
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

  fetchMenuRoles() {
    let self = this;
    this.reqService.get(
      `${MENU_ROLES_ENDPOINT}/${this.menuId}`,
      undefined,
      {showAlert: true}
    ).subscribe({
      next(res: Role[]) {
        self.menuRoles = res;
        console.log("MENU ROLES ",res)
      }
    })
  }

}
