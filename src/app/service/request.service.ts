import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, delayWhen, finalize, Observable, of, take, timer} from "rxjs";
import {BASE_API} from "../utility/constant";
import {CryptoService} from "./crypto.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private running: boolean = false;

  private options?: RequestOptions;

  private baseHeader = {
    'Content-Type': 'application/json',
    'Authorization': ''
  };

  constructor(
    private http: HttpClient,
    private cryptoService: CryptoService
  ) {
    this.options = new class implements RequestOptions {
      handleErrors: boolean = true;
    }
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
    this.baseHeader['Authorization'] = this.cryptoService.token.length > 0 ? `Bearer ${this.cryptoService.token}` : "";
    const headers = new HttpHeaders(this.baseHeader);

    return this.http.get<any>(this.digestURL(url), {headers}).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.running = false;
      })
    );
  }

  public post(url: string, obj: any, options?: RequestOptions): Observable<any> {
    if (this.running) {
      return timer(500).pipe(
        take(1),
        delayWhen(() => this.post(url, obj, options))
      );
    }

    this.running = true;
    this.baseHeader['Authorization'] = this.cryptoService.token.length > 0 ? `Bearer ${this.cryptoService.token}` : "";
    const headers = new HttpHeaders(this.baseHeader);

    return this.http.post<any>(this.digestURL(url), obj, {headers}).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.running = false;
      })
    );
  }

  private digestURL(url: string): string {
    return url.startsWith("/") ? BASE_API + url : url;
  }

}

export interface RequestOptions {
  handleErrors: boolean;
}
