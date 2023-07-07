import {Component, Input} from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];

}

export class Breadcrumb {
  label: string;
  link: string;

  constructor(label: string, link?: string) {
    this.label = label
    this.link = link ?? "";
  }
}
