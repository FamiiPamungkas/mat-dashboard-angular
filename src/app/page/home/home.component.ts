import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePage {
  static AUTHORITY: string = "dashboard";

  constructor(navService: NavigationService) {
    super(HomeComponent.AUTHORITY, navService);
  }
}
