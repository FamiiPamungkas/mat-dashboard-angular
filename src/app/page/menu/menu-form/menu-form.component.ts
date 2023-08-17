import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {NavigationService} from "../../../service/navigation.service";
import {RequestService} from "../../../service/request.service";
import {AlertDialogService} from "../../../service/alert-dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Menu, SimplyOption} from "../../../model/classes-implementation";
import {MENUS_ENDPOINT, MENUS_FOR_PARENT_ENDPOINT, MENU_GROUPS} from "../../../utility/constant";
import {isValidNumber} from "../../../utility/utility";
import {MatDialogRef} from "@angular/material/dialog";
import {BaseResponse} from "../../../model/interfaces";

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends BasePage implements OnInit {
  static AUTHORITY: string = "menu-list";
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
        this.parentMenus.push(new SimplyOption(opt.id.toString(), opt.name, false));
      }

      console.log("MENUS = ", this.parentMenus)
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
          console.log("RESPONSE ", res);
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

  }

  fetchGroupSuggestions(){
    let self = this;
    this.reqService.get(`${MENU_GROUPS}`).subscribe({
      next(res: Menu[]) {
        self.groupSuggestions = res.map(m => m.group);
        console.log("RESPONSE ", res, self.groupSuggestions);
      }
    })
  }

  checkGroup(search: string) {
    console.log(search)
  }
}
