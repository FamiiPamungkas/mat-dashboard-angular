import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {NavigationService} from "../../../service/navigation.service";
import {method, RequestService} from "../../../service/request.service";
import {AlertDialogService} from "../../../service/alert-dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Menu, SimplyOption} from "../../../model/classes-implementation";
import {MENU_GROUPS, MENUS_ENDPOINT, MENUS_FOR_PARENT_ENDPOINT} from "../../../utility/constant";
import {isValidNumber} from "../../../utility/utility";
import {MatDialogRef} from "@angular/material/dialog";
import {BaseResponse} from "../../../model/interfaces";

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends BasePage implements OnInit {
  static AUTHORITY: string = "user-menu";
  static PAGE_TITLE: string = "Add Menu";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Menus", "/menus"),
  ];

  menuId: string = "0";
  parentMenus: SimplyOption[] = [];
  groupSuggestions: string[] = [];
  isEdit: boolean = false;

  menu: Menu = new Menu();

  menuForm: FormGroup = new FormGroup({
    name: new FormControl(this.menu.name, [Validators.required]),
    authority: new FormControl(this.menu.authority, [Validators.required]),
    group: new FormControl(this.menu.group, [Validators.required]),
    link: new FormControl(this.menu.link),
    icon: new FormControl(this.menu.icon),
    visible: new FormControl(this.menu.visible),
    parent: new FormControl(this.menu?.parent?.id || ""),
    description: new FormControl(this.menu.description),
  })


  constructor(
    navService: NavigationService,
    private reqService: RequestService,
    private alertService: AlertDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(navService, MenuFormComponent.AUTHORITY, MenuFormComponent.PAGE_TITLE);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.title = "Edit Menu";
        this.menuId = params['id'];
        this.isEdit = true;
        this.breadcrumbs.push(new Breadcrumb("Edit Menu"));

        return;
      }
      this.breadcrumbs.push(new Breadcrumb("Add Menu"))
    });

    this.fetchGroupSuggestions();
    this.reqService.get(MENUS_FOR_PARENT_ENDPOINT).subscribe((res: Menu[]) => {
      this.parentMenus.push(new SimplyOption("", "-- Select None --", true))
      for (let opt of res) {
        if (opt.id === parseInt(this.menuId)) continue;
        this.parentMenus.push(new SimplyOption(opt.id.toString(), opt.name, false));
      }

      if (this.isEdit) {
        this.fetchMenuDetail(this.menuId);
      }
    });
  }

  private fetchMenuDetail(id: string) {
    if (!isValidNumber(id)) {
      const dialog: MatDialogRef<any> = this.alertService.showError("Invalid Menu ID", `The provided user ID [${id}] is not valid.`);
      dialog.afterClosed().subscribe(() => {
        this.router.navigateByUrl("/menus").finally();
      });
      return;
    }

    let self = this;
    this.reqService.get(`${MENUS_ENDPOINT}/${id}`)
      .subscribe({
        next(res: Menu) {
          self.menu = res;

          self.menuForm.get('name')?.setValue(self.menu.name);
          self.menuForm.get('authority')?.setValue(self.menu.authority);
          self.menuForm.get('group')?.setValue(self.menu.group);
          self.menuForm.get('link')?.setValue(self.menu.link);
          self.menuForm.get('icon')?.setValue(self.menu.icon);
          self.menuForm.get('visible')?.setValue(self.menu.visible);
          self.menuForm.get('parent')?.setValue(self.menu?.parent?.id || '');

        },
        error(error) {
          const res: BaseResponse = error.error;
          const dialog: MatDialogRef<any> = self.alertService.showError("Menu not found", res.message);
          dialog.afterClosed().subscribe(() => {
            return self.router.navigateByUrl("/menus");
          })
        }
      });
  }

  toggleVisible() {
    this.menu.visible = !this.menu.visible;
  }

  submit() {

    if (this.menuForm.valid) {
      this.menu.name = this.menuForm.get('name')?.value;
      this.menu.group = this.menuForm.get('group')?.value;
      this.menu.link = this.menuForm.get('link')?.value;
      this.menu.authority = this.menuForm.get('authority')?.value;
      this.menu.parent = new Menu(this.menuForm.get('parent')?.value);
      this.menu.icon = this.menuForm.get('icon')?.value;
      this.menu.description = this.menuForm.get('description')?.value;
      this.menu.visible = this.menuForm.get('visible')?.value;

      let method: method = "post";
      if (this.isEdit) method = "put";

      let self = this;
      this.reqService.post(MENUS_ENDPOINT, this.menu, {method}).subscribe({
        next() {
          let title = self.isEdit ? "Menu updated successfully" : "Menu added successfully";
          let message = self.isEdit ? "Menu has been updated successfully.<br>You will be redirected to menu list page." : "Menu has been added successfully.<br>You will be redirected to menu list page.";
          const successDialog: MatDialogRef<any> = self.alertService.showSuccess(title, message);
          successDialog.afterClosed().subscribe(() => {
            self.router.navigateByUrl("/menus").finally();
          });
        },
        error(err) {
          let res: BaseResponse = err.error;
          self.alertService.showError("Menu Addition Failed", res.message);
        }
      });

    }

  }

  get showIconInput(): boolean {
    return !this.menuForm.get('parent')?.value;
  }

  fetchGroupSuggestions() {
    let self = this;
    this.reqService.get(`${MENU_GROUPS}`).subscribe({
      next(res: string[]) {
        self.groupSuggestions = res;
      }
    })
  }

}
