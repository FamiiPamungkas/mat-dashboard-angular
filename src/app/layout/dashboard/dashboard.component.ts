import {Component, OnInit} from '@angular/core';
import {JsonService} from "../../service/json.service";
import {Menu} from "../../model/model";
import MenuImpl from "../../model/menuImpl";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menus: Menu[] = [];

  constructor(
    private jsonService: JsonService
  ) {
  }

  ngOnInit(): void {
    this.jsonService.getData("/assets/json/menus.json").subscribe(res => {
      this.generateMenus(res);
    }, err => {
      console.log("Error =", err)
    });
  }

  generateMenus(menus: Menu[]) {
    let lastGroup: string = "";
    for (let menu of menus) {
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
