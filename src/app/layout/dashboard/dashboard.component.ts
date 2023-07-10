import {Component, OnInit} from '@angular/core';
import {Menu, MenuDTO} from "../../model/interfaces";
import {MenuClass} from "../../model/classes-implementation";
import {NavigationService} from "../../service/navigation.service";
import {RequestService} from "../../service/request.service";
import {AuthService} from "../../service/auth.service";
import {dropdownAnimation} from "../../utility/constant";
import {Breadcrumb} from "../component/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [dropdownAnimation()]
})
export class DashboardComponent implements OnInit {
  menus: MenuDTO[] = [];
  activeNav: string = "";
  userMenuState: string = "closed";
  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private request: RequestService,
    private navService: NavigationService,
    private authService: AuthService,
  ) {
    this.breadcrumbs = [
      new Breadcrumb("Home","/dashboard"),
      new Breadcrumb("User","/users"),
    ]
  }

  ngOnInit(): void {
    this.navService.getActiveNav().subscribe(activeNav => {
      this.activeNav = activeNav
    });

    const user = this.authService.authUser;
    if (user != null) {
      this.generateMenus(user.treeMenus);
    }
  }

  generateMenus(menus: Menu[]) {
    menus.sort((a, b) => a.seq - b.seq);
    let lastGroup: string = "";
    for (let menu of menus) {
      menu.children.sort((a, b) => a.seq - b.seq);
      for (let menu2 of menu.children) {
        menu2.children.sort((a, b) => a.seq - b.seq);
      }

      if (lastGroup != menu.group) {
        let lastGroup: MenuDTO = new MenuClass();
        lastGroup.group = menu.group
        this.menus.push(lastGroup);
      }

      this.menus.push(menu);
      lastGroup = menu.group;
    }
  }

  openUserMenu() {
    this.userMenuState = this.userMenuState == "open" ? "closed" : "open";
  }

  logout() {
    this.authService.logout();
  }

  closeUserMenu() {
    this.userMenuState = "closed";
  }
}
