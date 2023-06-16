import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {rotateArrowAnimation, submenuToggleAnimation} from "../../../utility/constant";

@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  animations:[submenuToggleAnimation(), rotateArrowAnimation()]
})
export class SubMenuComponent implements AfterContentInit {
  @Input() label: string = "";
  @Input() active: boolean = false;
  @ContentChildren(SubMenuComponent) submenus?: QueryList<SubMenuComponent>;

  @Input() level: number = 1;
  hasSubmenu: boolean = false;
  submenuState: string = 'closed';

  ngAfterContentInit() {
    if (this.submenus && this.submenus?.length > 0) {
      this.hasSubmenu = true;
    }
  }

  toggleSubmenu(){
    this.submenuState = this.submenuState == 'closed' ? 'open' : 'closed';
  }
}
