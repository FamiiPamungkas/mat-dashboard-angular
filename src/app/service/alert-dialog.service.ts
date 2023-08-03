import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  AlertDialogComponent,
  AlertDialogData,
  alertDialogType
} from "../layout/component/alert-dialog/alert-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  showAlertDialog(title: string, message: string, cfg?: alertDialogCfg): MatDialogRef<any> {
    return this.openDialog("normal", title, message, cfg);
  }

  showSuccess(title: string, message: string, cfg?: alertDialogCfg): MatDialogRef<any> {
    return this.openDialog("success", title, message, cfg);
  }

  showWarning(title: string, message: string, cfg?: alertDialogCfg): MatDialogRef<any> {
    return this.openDialog("warning", title, message, cfg);
  }

  showError(title: string, message: string, cfg?: alertDialogCfg): MatDialogRef<any> {
    return this.openDialog("danger", title, message, cfg);
  }

  private openDialog(type: alertDialogType, title: string, message: string, cfg?: alertDialogCfg): MatDialogRef<any> {
    const data: AlertDialogData = {
      type: type,
      useConfirmBtn: cfg?.useConfirmBtn ?? true,
      useCancelBtn: cfg?.useCancelBtn ?? false,
      confirmLabel: cfg?.confirmLabel || "",
      cancelLabel: cfg?.cancelLabel || "",
      message,
      title,
    };

    return this.dialog.open(AlertDialogComponent, {width: cfg?.width ?? '300px', data});
  }

}

export interface alertDialogCfg {
  width: string
  useConfirmBtn: boolean
  useCancelBtn: boolean
  confirmLabel: string
  cancelLabel: string
}
