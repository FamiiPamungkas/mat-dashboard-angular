import {Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() type: notificationType = "primary";
  @Input() message: string = "";
  @Input() title: string = "";

  private timer: any;
  timeout: number = 1000;

  constructor() {
    this.startTimer();
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.timeout > 0) {
        this.timeout--;
        return;
      }
      this.stopTimer();
    },1);
  }

  private stopTimer() {
    clearInterval(this.timer);
  }

  get isSingleText(): boolean {
    return (this.message === "" || this.title === "");
  }

  get icon(): string {
    switch (this.type) {
      case "primary":
        return "info"
      case "success":
        return "check_circle_outline"
      case "warning":
        return "report_problem"
      case "danger":
        return "close"
      default:
        return "info"
    }
  }

  @HostListener('mouseenter') onHover() {
    this.stopTimer();
  }

  @HostListener('mouseleave') onBlur() {
    this.startTimer();
  }

}

export declare type notificationType =
  'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'light';
