import {AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges} from '@angular/core';
import {rotateArrowAnimation, dropdownAnimation} from "../../../utility/constant";
import {Router} from "@angular/router";

@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  animations: [dropdownAnimation(), rotateArrowAnimation()]
})
export class SubMenuComponent implements OnChanges, AfterContentInit {
  @Input() label: string = "";
  @Input() active: boolean = false;
  @Input() link: string = "";
  @Input() level: number = 1;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['active']) {
      this.submenuState = this.active ? 'open' : 'closed';
    }
  }

  toggleSubmenu() {
    if (!this.hasSubmenu) {
      this.router.navigateByUrl(this.link).then(r => false);
      return;
    }

    this.submenuState = this.submenuState == 'closed' ? 'open' : 'closed';
  }
}
