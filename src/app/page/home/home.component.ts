import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly authority: string = "user-management";

  constructor(
    private navService: NavigationService
  ) {
    navService.activeNav = this.authority;
  }

}
