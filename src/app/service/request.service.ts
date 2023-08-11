import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {BASE_API} from "../utility/constant";
import {AlertDialogService} from "./alert-dialog.service";
import {BaseResponse} from "../model/interfaces";
import {NotificationService} from "./notification.service";
import {AppNotification} from "../model/classes-implementation";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public showAlert: boolean = false;
  public alertType: alertType = "notification";
  public method: method = "post";

  constructor(
    private http: HttpClient,
    private alertService: AlertDialogService,
    private notificationService: NotificationService
  ) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("## REQUEST ERROR => ", error);
    let res: BaseResponse = error.error;
    if (!error.error || error.status === 0) {
      this.notificationService.addNotification(
        new AppNotification("danger", "Connection Error", "Can't connect to server. Check your connection or try again later.")
      );
    } else if ((error.status === 403 || error.status === 404) && this.showAlert) {
      let title: string = (error.status === 403) ? "Access Denied" : "";
      if (this.alertType == "dialog") {
        this.alertService.showError(title, res.message || "Unknown Error");
      } else {
        this.notificationService.addNotification(
          new AppNotification("danger", title, res.message || "Unknown Error")
        );
      }
    }
    throw error;
  }

  private applyConfig(cfg?: requestCfg) {
    this.showAlert = cfg?.showAlert || false;
    this.alertType = cfg?.alertType || "notification";
  }

  public get(url: string, obj?: any, cfg?: requestCfg): Observable<any> {

    this.applyConfig(cfg);
    return this.baseGet(url, obj).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  public post(url: string, obj: any, cfg?: requestCfg): Observable<any> {

    this.applyConfig(cfg);
    this.method = cfg?.method || "post";
    return this.basePost(url, obj).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  basePost(url: string, obj?: any) {
    obj = obj || undefined;
    switch (this.method) {
      case "delete":
        return this.http.delete<any>(this.digestURL(url), obj);
      case "put":
        return this.http.put<any>(this.digestURL(url), obj);
      default :
        return this.http.post<any>(this.digestURL(url), obj);
    }
  }

  baseGet(url: string, obj?: any) {
    obj = obj || undefined;
    return this.http.get<any>(this.digestURL(url), obj);
  }

  private digestURL(url: string): string {
    return url.startsWith("/") ? BASE_API + url : url;
  }

}

export interface requestCfg {
  showAlert?: boolean
  alertType?: alertType
  method?: method
}

export declare type method = "post" | "put" | "delete";
export declare type alertType = "dialog" | "notification";
