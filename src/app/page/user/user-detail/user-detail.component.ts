import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {NavigationService} from "../../../service/navigation.service";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {ActivatedRoute, Router} from "@angular/router";
import {formatIsoDate, isValidNumber} from "../../../utility/utility";
import {AlertDialogService} from "../../../service/alert-dialog.service";
import {MatDialogRef} from "@angular/material/dialog";
import {USERS_ENDPOINT} from "../../../utility/constant";
import {BaseResponse, UserDTO} from "../../../model/interfaces";
import {RequestService} from "../../../service/request.service";
import {User} from "../../../model/classes-implementation";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BasePage implements OnInit {
  static PAGE_TITLE: string = "User Detail";
  static AUTHORITY: string = "user-list";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users", "/users"),
    new Breadcrumb("User Detail"),
  ];

  private userId: number = 0;
  user: User = new User();

  constructor(
    navService: NavigationService,
    private activeRoute: ActivatedRoute,
    private alertService: AlertDialogService,
    private router: Router,
    private reqService: RequestService
  ) {
    super(navService, UserDetailComponent.AUTHORITY, UserDetailComponent.PAGE_TITLE);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if (id && isValidNumber(id)) {
        this.userId = id;
        this.fetchUserData(this.userId);
      } else {
        const dialog: MatDialogRef<any> = this.alertService.showError("Invalid User ID", `The provided user ID [${id}] is not valid.`);
        dialog.afterClosed().subscribe(() => {
          this.router.navigateByUrl("/users").finally();
        });
      }
    });
  }

  fetchUserData(id: number) {
    let self = this;
    this.reqService.get(USERS_ENDPOINT + "/" + id)
      .subscribe({
        next(res: User) {
          self.user = res;
          self.user.fmtBirthdate = formatIsoDate(res.birthdate,"dd MMMM yyyy")
          console.log("RESPONSE ", res);
        },
        error(error) {
          const res: BaseResponse = error.error;
          const dialog: MatDialogRef<any> = self.alertService.showError("User not found", res.message);
          dialog.afterClosed().subscribe(() => {
            return self.router.navigateByUrl("/users");
          })
        }
      })
  }

  protected readonly formatIsoDate = formatIsoDate;
}
