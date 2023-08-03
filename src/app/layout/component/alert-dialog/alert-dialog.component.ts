import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfo,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  type: alertDialogType = "normal";
  title: string = "";
  message: string = "";

  useConfirmBtn: boolean;
  useCancelBtn: boolean;
  _confirmLabel: string;
  _cancelLabel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: AlertDialogData,
  ) {
    this.type = data.type ?? "normal";
    this.title = data.title ?? "";
    this.message = data.message ?? "";
    this.useConfirmBtn = data.useConfirmBtn ?? false;
    this.useCancelBtn = data.useCancelBtn ?? false;
    this._confirmLabel = data.confirmLabel || "Confirm";
    this._cancelLabel = data.cancelLabel || "Cancel";
  }

  get confirmLabel() {
    return this._confirmLabel;
  }

  get cancelLabel() {
    return this._cancelLabel;
  }

  get isSingleButton() {
    return (this.useConfirmBtn && !this.useCancelBtn) || (!this.useConfirmBtn && this.useCancelBtn);
  }

  get icon(): IconDefinition {
    switch (this.type) {
      case "danger":
        return faExclamationCircle
      case "warning":
        return faExclamationTriangle
      case "success":
        return faCheckCircle
      default :
        return faInfo
    }
  }
}

export declare type alertDialogType = "normal" | "danger" | "warning" | "success";

export interface AlertDialogData {
  type: alertDialogType;
  title?: string
  message?: string
  useConfirmBtn?: boolean
  useCancelBtn?: boolean
  confirmLabel?: string
  cancelLabel?: string
}
