import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delayWhen, finalize, Observable, take, throwError, timer} from "rxjs";
import {BASE_API} from "../utility/constant";
import {AlertDialogService} from "./alert-dialog.service";
import {BaseResponse} from "../model/interfaces";
import {NotificationService} from "./notification.service";
import {AppNotification} from "../model/classes-implementation";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private running: boolean = false;
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
    if (error.status === 0) {
      this.notificationService.addNotification(
        new AppNotification("danger", "Connection Error", "Can't connect to server. Check your connection or try again later.")
      );
    } else if ((error.status === 403 || error.status === 404) && this.showAlert) {
      let title: string = (error.status === 403) ? "Access Denied" : "";
      if (this.alertType == "dialog") {
        this.alertService.showError(title, res.message || "Unknown Error");
      } else {
        this.notificationService.addNotification(
          new AppNotification("danger", "", res.message || "Unknown Error")
        );
      }
    }
    return throwError(error);
  }

  private applyConfig(cfg?: requestCfg) {
    this.showAlert = cfg?.showAlert || false;
    this.alertType = cfg?.alertType || "notification";
  }

  public get(url: string, obj?: any, cfg?: requestCfg): Observable<any> {
    if (this.running) {
      return timer(500).pipe(
        take(1),
        delayWhen(() => this.get(url, obj, cfg))
      );
    }

    this.running = true;
    this.applyConfig(cfg);
    return this.baseGet(url, obj).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => {
        this.running = false;
      })
    );
  }

  public post(url: string, obj: any, cfg?: requestCfg): Observable<any> {
    if (this.running) {
      return timer(500).pipe(
        take(1),
        delayWhen(() => this.post(url, obj))
      );
    }

    this.running = true;
    this.applyConfig(cfg);
    this.method = cfg?.method || "post";
    return this.basePost(this.digestURL(url), obj).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => {
        this.running = false;
      })
    );
  }

  basePost(url: string, obj?: any) {
    console.log("URL= ",url)
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
    if (obj == null) obj = undefined;
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
