import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {BasePage} from "../base-page";
import {NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent extends BasePage {

  constructor(
    navService: NavigationService,
    private router: Router
  ) {
    super(
      navService,
      "not-found",
      "Not Found"
    )
  }

  home() {
    this.router.navigateByUrl("/").finally();
  }
}
