import {Component, OnInit} from '@angular/core';
import {JsonService} from "../../service/json.service";
import {Menu} from "../../model/model";
import MenuImpl from "../../model/menuImpl";
import {NavigationService} from "../../service/navigation.service";
import {RequestService} from "../../service/request.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menus: Menu[] = [];

  constructor(
    private request: RequestService,
    private navService: NavigationService
  ) {
  }

  ngOnInit(): void {
    this.request.get("/api/v1/users/1").subscribe(res=>{
      const treeMenus = res.treeMenus;
      this.generateMenus(treeMenus);
    });
  }

  generateMenus(menus: Menu[]) {
    menus.sort((a,b)=>a.seq-b.seq);
    let lastGroup: string = "";
    let isM1Active: boolean = false;
    let isM2Active: boolean = false;
    let isM3Active: boolean = false;

    for (let menu of menus) {
      menu.children.sort((a,b)=>a.seq-b.seq);
      for (let menu2 of menu.children) {
        menu2.children.sort((a,b)=>a.seq-b.seq);
        for (let menu3 of menu2.children) {
          menu3.active = (menu3.authority == this.navService.activeNav);
        }

        isM3Active = menu2.children.some(s => s.authority == this.navService.activeNav);
        menu2.active = (menu2.authority == this.navService.activeNav || isM3Active);
      }

      isM1Active = (menu.authority == this.navService.activeNav);
      isM2Active = menu.children.some(s => s.authority == this.navService.activeNav);
      isM3Active = menu.children.some(s => s.children.some(s2 => s2.authority == this.navService.activeNav));
      menu.active = (isM1Active || isM2Active || isM3Active);

      if (lastGroup != menu.group) {
        let lastGroup: Menu = new MenuImpl();
        lastGroup.group = menu.group
        this.menus.push(lastGroup);
      }

      this.menus.push(menu);
      lastGroup = menu.group;
    }
  }
}
