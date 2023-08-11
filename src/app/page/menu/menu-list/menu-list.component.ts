import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {faMagnifyingGlass, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {NavigationService} from "../../../service/navigation.service";
import {RequestService} from "../../../service/request.service";
import {MENUS_ENDPOINT} from "../../../utility/constant";
import {BasePage} from "../../base-page";
import {Menu} from "../../../model/classes-implementation";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent extends BasePage implements OnInit {
  static PAGE_TITLE: string = "Menus";
  static AUTHORITY: string = "user-menu";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Menus"),
  ];

  detailIcon: IconDefinition = faMagnifyingGlass;

  menus: Menu[] = []

  constructor(
    navService: NavigationService,
    private reqService: RequestService
  ) {
    super(navService, MenuListComponent.AUTHORITY, MenuListComponent.PAGE_TITLE);
  }

  ngOnInit() {
    this.fetchMenuList();
  }

  fetchMenuList() {
    let self = this;
    this.reqService.get(MENUS_ENDPOINT, undefined, {showAlert: true}).subscribe({
      next(res) {
        console.log("MENU LIST =", res)
        self.menus = res;
        self.menus.sort((a, b) => a.seq - b.seq);
      }
    })
  }

}
