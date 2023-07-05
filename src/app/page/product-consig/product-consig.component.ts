import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-product-consig',
  templateUrl: './product-consig.component.html',
  styleUrls: ['./product-consig.component.css']
})
export class ProductConsigComponent extends BasePage {
  static AUTHORITY: string = "product-consignment";

  constructor(navService: NavigationService) {
    super(ProductConsigComponent.AUTHORITY, navService);
  }
}
