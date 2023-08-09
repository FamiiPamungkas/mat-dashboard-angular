import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {APP_NAME} from "./utility/constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly DASHBOARD_LAYOUT: string = "dashboard";
  readonly AUTH_LAYOUT: string = "auth";

  activeLayout: string = this.AUTH_LAYOUT;

  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {
    title.setTitle(`${APP_NAME}`);
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLayout = this.authService.isLoggedIn ? this.DASHBOARD_LAYOUT : this.AUTH_LAYOUT;
      }
    })
  }

}
