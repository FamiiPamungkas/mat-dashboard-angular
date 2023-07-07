import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";
import {RequestService} from "../../service/request.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePage {
  static AUTHORITY: string = "dashboard";
  static PAGE_TITLE: string = "Dashboard";

  constructor(
    private navService: NavigationService,
    private requestService: RequestService
  ) {
    super(
      navService,
      HomeComponent.AUTHORITY,
      HomeComponent.PAGE_TITLE
    );
  }

  test() {
    this.requestService.get("/v1/users/1").subscribe(res => {
      console.log("response", res);
    })
  }
}
