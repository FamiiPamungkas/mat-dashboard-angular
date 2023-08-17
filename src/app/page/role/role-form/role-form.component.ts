import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {Menu, Role} from "../../../model/classes-implementation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationService} from "../../../service/navigation.service";
import {method, RequestService} from "../../../service/request.service";
import {AlertDialogService} from "../../../service/alert-dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MENUS_ENDPOINT, ROLES_ENDPOINT} from "../../../utility/constant";
import {isValidNumber} from "../../../utility/utility";
import {MatDialogRef} from "@angular/material/dialog";
import {BaseResponse} from "../../../model/interfaces";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent extends BasePage implements OnInit {
  static AUTHORITY: string = "user-role";
  static PAGE_TITLE: string = "Add Role";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Roles", "/roles"),
  ];

  id: string = "0";
  isEdit: boolean = false;

  role: Role = new Role();
  menus: Menu[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(this.role.name, [Validators.required]),
    authority: new FormControl(this.role.authority, [Validators.required]),
    description: new FormControl(this.role.description),
  })


  constructor(
    navService: NavigationService,
    private reqService: RequestService,
    private alertService: AlertDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(navService, RoleFormComponent.AUTHORITY, RoleFormComponent.PAGE_TITLE);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.title = "Edit Role";
        this.id = params['id'];
        this.isEdit = true;
        this.breadcrumbs.push(new Breadcrumb("Edit Role"));

        return;
      }
      this.breadcrumbs.push(new Breadcrumb("Add Role"))
    });

    this.fetchMenus();
    if (this.isEdit) {
      this.fetchRoleDetail(this.id);
    }
  }

  private fetchRoleDetail(id: string) {
    if (!isValidNumber(id)) {
      const dialog: MatDialogRef<any> = this.alertService.showError("Invalid Role ID", `The provided user ID [${id}] is not valid.`);
      dialog.afterClosed().subscribe(() => {
        this.router.navigateByUrl("/roles").finally();
      });
      return;
    }

    let self = this;
    this.reqService.get(`${ROLES_ENDPOINT}/${id}`)
      .subscribe({
        next(res: Role) {
          self.role = res;

          self.form.get('name')?.setValue(self.role.name);
          self.form.get('authority')?.setValue(self.role.authority);
          self.form.get('description')?.setValue(self.role.description);

        },
        error(error) {
          const res: BaseResponse = error.error;
          const dialog: MatDialogRef<any> = self.alertService.showError("Role not found", res.message);
          dialog.afterClosed().subscribe(() => {
            return self.router.navigateByUrl("/roles");
          })
        }
      });
  }

  submit() {

    if (this.form.valid) {
      this.role.name = this.form.get('name')?.value;
      this.role.authority = this.form.get('authority')?.value;
      this.role.description = this.form.get('description')?.value;

      let method: method = "post";
      if (this.isEdit) method = "put";

      let self = this;
      this.reqService.post(ROLES_ENDPOINT, this.role, {method}).subscribe({
        next() {
          let title = self.isEdit ? "Role updated successfully" : "Role added successfully";
          let message = self.isEdit ? "Role has been updated successfully.<br>You will be redirected to role list page." : "Role has been added successfully.<br>You will be redirected to role list page.";
          const successDialog: MatDialogRef<any> = self.alertService.showSuccess(title, message);
          successDialog.afterClosed().subscribe(() => {
            self.router.navigateByUrl("/roles").finally();
          });
        },
        error(err) {
          let res: BaseResponse = err.error;
          self.alertService.showError("Role Addition Failed", res.message);
        }
      });
    }
  }

  fetchMenus() {
    let self = this;
    this.reqService.get(MENUS_ENDPOINT).subscribe({
      next(res: Menu[]) {
        self.menus = res;
      }
    })
  }
}
