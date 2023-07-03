import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {SubMenuComponent} from "../sub-menu/sub-menu.component";
import {rotateArrowAnimation, submenuToggleAnimation} from "../../../utility/constant";
import {Router} from "@angular/router";

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [submenuToggleAnimation(), rotateArrowAnimation()]
})
export class MenuItemComponent implements AfterContentInit {
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() active: boolean = false;
  @Input() link: string = "";
  @ContentChildren(SubMenuComponent) submenus?: QueryList<SubMenuComponent>;

  hasSubmenu: boolean = false;
  submenuState: string = 'closed';

  constructor(
    private router: Router
  ) {
  }

  ngAfterContentInit() {
    if (this.submenus && this.submenus?.length > 0) {
      this.hasSubmenu = true;
    }

    this.submenuState = this.active ? 'open' : 'closed';
  }

  toggleSubmenu() {
    if (!this.hasSubmenu) {
      this.router.navigateByUrl(this.link).then(r => false);
      return;
    }

    this.submenuState = this.submenuState == 'closed' ? 'open' : 'closed';
  }
}
