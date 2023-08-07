import {AfterViewInit, Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";
import {Breadcrumb} from "../../layout/component/breadcrumbs/breadcrumbs.component";
import {RequestService} from "../../service/request.service";
import {UserDTO} from "../../model/interfaces";
import {Router} from "@angular/router";
import {USERS_ENDPOINT} from "../../utility/constant";
import {faTrashCan, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BasePage implements AfterViewInit {
  static PAGE_TITLE: string = "Users";
  static AUTHORITY: string = "user-list";
  users: UserDTO[] = [];

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users"),
  ];

  deleteIcon: IconDefinition = faTrashCan;

  constructor(
    private navService: NavigationService,
    private reqService: RequestService,
    private router: Router
  ) {
    super(navService, UserComponent.AUTHORITY, UserComponent.PAGE_TITLE);
  }

  ngAfterViewInit() {
    this.reqService.get(USERS_ENDPOINT).subscribe(res => {
      this.users = res;
    })
  }

  addUser() {
    this.router.navigateByUrl("/user-form").then(() => false);
  }

  deleteUser(id: number) {
    this.reqService.post(USERS_ENDPOINT+"/"+id,null,{method:"delete"}).subscribe({
      next(res){
        console.log("RESPONSE ",res);
      },
      error(err){
        console.log("ERROR", err)
      }
    })
    console.log("DELETE = ",id)
  }
}
