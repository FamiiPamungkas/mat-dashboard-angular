import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delayWhen, finalize, Observable, of, take, timer} from "rxjs";
import {BASE_API} from "../utility/constant";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private running: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("## REQUEST ERROR => ", error);
    return of(error.error);
  }

  public get(url: string): Observable<any> {
    if (this.running) {
      return timer(500).pipe(
        take(1),
        delayWhen(() => this.get(url))
      );
    }

    this.running = true;
    return this.http.get<any>(this.digestURL(url)).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.running = false;
      })
    );
  }

  public post(url: string, obj: any): Observable<any> {
    if (this.running) {
      return timer(500).pipe(
        take(1),
        delayWhen(() => this.post(url, obj))
      );
    }

    this.running = true;
    return this.basePost(this.digestURL(url), obj).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.running = false;
      })
    );
  }

  basePost(url: string, obj?: any) {
    return this.http.post<any>(this.digestURL(url), obj);
  }

  private digestURL(url: string): string {
    return url.startsWith("/") ? BASE_API + url : url;
  }

}
