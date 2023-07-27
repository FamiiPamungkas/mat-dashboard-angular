import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent{
  @Input() type: notificationType = "primary";
  @Input() message: string = "";
  @Input() title: string = "";
  icon: string = "";

  constructor() {
    if (this.type === "danger" && this.message === "" && this.title === "") this.message = "Unknown Error";
    console.log("type = ",this.type)
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
