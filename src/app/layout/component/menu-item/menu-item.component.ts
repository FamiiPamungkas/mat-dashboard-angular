import {AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges} from '@angular/core';
import {SubMenuComponent} from "../sub-menu/sub-menu.component";
import {dropdownAnimation, rotateArrowAnimation} from "../../../utility/constant";

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [dropdownAnimation(), rotateArrowAnimation()]
})
export class MenuItemComponent implements OnChanges, AfterContentInit {
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() active: boolean = false;
  @Input() link: string = "";
  @ContentChildren(SubMenuComponent) submenus?: QueryList<SubMenuComponent>;

  hasSubmenu: boolean = false;
  submenuState: string = 'closed';

  ngAfterContentInit() {
    if (this.submenus && this.submenus?.length > 0) {
      this.hasSubmenu = true;
    }

    this.submenuState = this.active ? 'open' : 'closed';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['active']){
      this.submenuState = this.active ? 'open' : 'closed';
    }
  }

  toggleSubmenu() {
    if (!this.hasSubmenu) {
      return;
    }

    this.submenuState = this.submenuState == 'closed' ? 'open' : 'closed';
  }
}
