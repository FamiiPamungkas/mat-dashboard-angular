import {Injectable, ViewContainerRef} from '@angular/core';
import {
  NotificationContainerComponent
} from "../layout/component/notification-container/notification-container.component";
import {NotificationComponent} from "../layout/component/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  containerRef!: ViewContainerRef;

  constructor() {
  }

  addNotification(){
    this.containerRef.createComponent(NotificationComponent);
  }
}
