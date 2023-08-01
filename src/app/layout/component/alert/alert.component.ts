import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: alertType = 'info';
  @Input() icon: string = "";
  @Input() closable: boolean = false;
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  closeAlert(): void {
    this.closed.emit();
  }
}

export declare type alertType = 'info' | 'success' | 'warning' | 'danger';
