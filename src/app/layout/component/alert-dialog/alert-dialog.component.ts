import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  type: alertDialogType = "normal";
  title: string = "";
  message: string = "";

  useConfirmBtn: boolean = false;
  useCancelBtn: boolean = false;
  _confirmLabel: string = "Confirm";
  _cancelLabel: string = "Cancel";

  constructor(
    @Inject(MAT_DIALOG_DATA) data: AlertDialogData,
  ) {
    if (data) {
      if (data.type) this.type = data.type;
      if (data.title) this.title = data.title;
      if (data.message) this.message = data.message;
      if (data.useConfirmBtn) this.useConfirmBtn = data.useConfirmBtn;
      if (data.useCancelBtn) this.useCancelBtn = data.useCancelBtn;
      if (data.confirmLabel) this._confirmLabel = data.confirmLabel ?? "Confirm";
      if (data.cancelLabel) this._cancelLabel = data.cancelLabel ?? "Cancel";
    }

    console.log("CONFIRM LABEL = "+this.confirmLabel)
  }

  get confirmLabel(){
    return this._confirmLabel;
  }

  get cancelLabel(){
    return this._cancelLabel;
  }

}


export declare type alertDialogType = "normal";

export interface AlertDialogData {
  type: alertDialogType;
  title?: string
  message?: string
  useConfirmBtn?: boolean
  useCancelBtn?: boolean
  confirmLabel?: string
  cancelLabel?: string
}
