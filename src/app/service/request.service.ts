import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delayWhen, EMPTY, finalize, Observable, take, throwError, timer} from "rxjs";
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

  constructor(
    private http: HttpClient,
    private alertService: AlertDialogService,
    private notificationService: NotificationService
  ) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("## REQUEST ERROR => ", error);
    let res: BaseResponse = error.error;
    if ((error.status === 403 || error.status === 404) && this.showAlert) {
      if (this.alertType == "dialog") {
        this.alertService.showError("Request Error", res.message || "Unknown Error");
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
    return this.basePost(this.digestURL(url), obj).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => {
        this.running = false;
      })
    );
  }

  basePost(url: string, obj?: any) {
    return this.http.post<any>(this.digestURL(url), obj);
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
}

export declare type alertType = "dialog" | "notification";
