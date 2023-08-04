import {Component} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {BasePage} from "../base-page";
import {RequestService} from "../../service/request.service";
import {NotificationService} from "../../service/notification.service";
import {AppNotification} from "../../model/classes-implementation";
import {notificationType} from "../../layout/component/notification/notification.component";
import {USERS_ENDPOINT} from "../../utility/constant";
import {catchError, EMPTY, throwError} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePage {
  static AUTHORITY: string = "dashboard";
  static PAGE_TITLE: string = "Dashboard";

  constructor(
    private navService: NavigationService,
    private requestService: RequestService,
    private notifService: NotificationService
  ) {
    super(
      navService,
      HomeComponent.AUTHORITY,
      HomeComponent.PAGE_TITLE
    );
  }

  test() {
    this.requestService.get(USERS_ENDPOINT + "/11",null,{showAlert:true}).pipe(
      catchError((err)=>{
        console.log("error ",err)
        return EMPTY;
      }),
    ).subscribe(res=>{
      console.log("RESULT ",res)
    })
  }

  addNotification() {
    let tipes: notificationType[] = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'dark', 'light']
    let notif = new AppNotification(
      tipes[Math.floor(Math.random() * tipes.length)],
      "Notification Title",
      "This messages is only for testing only",
    );
    this.notifService.addNotification(notif)
  }


}
