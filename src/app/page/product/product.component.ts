import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BasePage {
  static AUTHORITY: string = "product-normal";
  static PAGE_TITLE: string = "Products";

  constructor(navService: NavigationService) {
    super(
      navService,
      ProductComponent.AUTHORITY,
      ProductComponent.PAGE_TITLE
    );
  }
}
