import {Component} from '@angular/core';
import {AppNotification} from "../../../model/classes-implementation";

@Component({
  selector: 'notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.css']
})
export class NotificationContainerComponent {
  notifications: AppNotification[] = [
    new AppNotification("primary","" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit."),
    new AppNotification("secondary","Hello" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit."),
    new AppNotification("info","Hello" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit."),
    new AppNotification("success","Hello" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit.","check_circle"),
    new AppNotification("warning","Hello" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit.","warning"),
    new AppNotification("danger","Hello" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit.","error_outline"),
    new AppNotification("dark","Hello" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit."),
    new AppNotification("light","Error" ,"Lorem ipsum dolor sit amet, consectetur adipisicing elit."),
  ];

}
