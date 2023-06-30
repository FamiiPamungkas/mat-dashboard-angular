import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";

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
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.activeLayout = this.authService.isLoggedIn ? this.DASHBOARD_LAYOUT : this.AUTH_LAYOUT;
    if (this.activeLayout == this.AUTH_LAYOUT && location.pathname != '/login') location.href = '/login';
  }

}
