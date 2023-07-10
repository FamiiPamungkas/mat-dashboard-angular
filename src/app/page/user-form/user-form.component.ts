import {AfterViewInit, Component} from '@angular/core';
import {BasePage} from "../base-page";
import {NavigationService} from "../../service/navigation.service";
import {RequestService} from "../../service/request.service";
import {SimpleOption} from "../../model/interfaces";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BasePage implements AfterViewInit {
  static AUTHORITY: string = "user-list";
  static PAGE_TITLE: string = "AddUser";

  roleOptions: SimpleOption[] = [];

  constructor(
    navService: NavigationService,
    private reqService: RequestService
  ) {
    super(
      navService,
      UserFormComponent.AUTHORITY,
      UserFormComponent.PAGE_TITLE
    );
  }


  ngAfterViewInit() {
    this.reqService.get("/v1/roles/options").subscribe(
      res => {
        this.roleOptions = res
        console.log("Response = " ,this.roleOptions);
      }
    )
  }


}
