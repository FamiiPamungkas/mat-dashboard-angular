import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, delayWhen, finalize, Observable, of, take, timer} from "rxjs";
import {API_URL} from "../utility/constant";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIxLjAuMCIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NzkyMjMxNSwiZXhwIjoxNjkwNTE0MzE1fQ.Mz--Zvm5mebMT95zeRIHf3PIFUdUHrlG7EpR3ce6VNE'; // Replace with your actual token
  private apiUrl: string = API_URL;
  private running: boolean = false;

  private options?: RequestOptions;

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  constructor(
    private http: HttpClient
  ) {
    this.options = new class implements RequestOptions {
      handleErrors: boolean = true;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("error ", error);
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
    const headers = this.headers;

    return this.http.get<any>(`${this.apiUrl}${url}`, {headers}).pipe(
      catchError(this.handleError)
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
    const headers = this.headers;
    return this.http.post<any>(`${this.apiUrl}${url}`, obj, {headers}).pipe(
      catchError(this.handleError),
      finalize(()=>{
        this.running = false;
      })
    );
  }

}

export interface RequestOptions {
  handleErrors: boolean;
}
