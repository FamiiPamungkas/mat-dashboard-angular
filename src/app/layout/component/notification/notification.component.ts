import {Component, HostListener, Input} from '@angular/core';
import {AppNotification} from "../../../model/classes-implementation";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() notification?: AppNotification;

  private timer: any;
  c: number = 8;
  timeout: number = this.c * 100;

  constructor(private notificationService: NotificationService) {
    this.startTimer();
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.timeout > 0) {
        this.timeout--;
        return;
      }
      this.stopTimer();
      this.remove();
    }, 1);
  }

  private stopTimer() {
    clearInterval(this.timer);
  }

  get isSingleText(): boolean {
    return (this.notification?.message === "" || this.notification?.title === "");
  }

  get icon(): string {
    if (this.notification?.icon) return this.notification.icon;
    switch (this.notification?.type) {
      case "info":
        return "info"
      case "success":
        return "check_circle_outline"
      case "warning":
        return "report_problem"
      case "danger":
        return "close"
      default:
        return "scatter_plot"
    }
  }

  @HostListener('mouseenter') onHover() {
    this.stopTimer();
  }

  @HostListener('mouseleave') onBlur() {
    this.startTimer();
  }

  remove() {
    this.notificationService.removeNotification(this.notification);
  }

}

export declare type notificationType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
