import {Injectable} from '@angular/core';
import {AppNotification} from "../model/classes-implementation";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications: AppNotification[] = []

  constructor() {
  }

  get notifications() {
    return this._notifications.slice().reverse();
  }

  addNotification(notif: AppNotification) {
    this._notifications.push(notif);
  }

  removeNotification(notification?: AppNotification) {
    if (!notification) return;
    let index = this._notifications.findIndex((o) => o.id === notification.id);
    if (index >= 0) {
      this._notifications.splice(index, 1);
    }
  }

}
