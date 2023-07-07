import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.css']
})
export class NavLinkComponent {
  @Input() type: linkType = "primary"
  @Input() weight: linkWeight = "normal"
  @Input() link: string = "";
  @Input() label: string = "";

  constructor(
    private router: Router
  ) {
  }

  navigateTo() {
    if (this.link.trim().length == 0) {
      return;
    }
    this.router.navigateByUrl(this.link.trim()).then(() => false);
  }
}

export declare type linkType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
export declare type linkWeight = 'thin' | 'normal' | 'semibold' | 'bold';
