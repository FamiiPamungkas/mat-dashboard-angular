import { Component } from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BasePage{
  static AUTHORITY: string = "product-normal";

  constructor(navService: NavigationService) {
    super(ProductComponent.AUTHORITY, navService);
  }
}
