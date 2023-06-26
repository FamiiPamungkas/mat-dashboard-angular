import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {SubMenuComponent} from "../sub-menu/sub-menu.component";
import {rotateArrowAnimation, submenuToggleAnimation} from "../../../utility/constant";

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
  @Input() link :string = "";
  @ContentChildren(SubMenuComponent) submenus?: QueryList<SubMenuComponent>;

  hasSubmenu: boolean = false;
  submenuState: string = 'closed';

  ngAfterContentInit() {
    if (this.submenus && this.submenus?.length > 0) {
      this.hasSubmenu = true;
    }
  }

  toggleSubmenu() {
    if (!this.hasSubmenu){
      location.href = this.link;
      return;
    }

    this.submenuState = this.submenuState == 'closed' ? 'open' : 'closed';
  }
}
