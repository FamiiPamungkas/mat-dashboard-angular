import {Component, Input} from '@angular/core';
import {Breadcrumb} from "../breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent {
  @Input() title: string = "";
  @Input() breadcrumbs:Breadcrumb[] = [];

}
