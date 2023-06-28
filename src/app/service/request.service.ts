import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIxLjAuMCIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NzkyMjMxNSwiZXhwIjoxNjkwNTE0MzE1fQ.Mz--Zvm5mebMT95zeRIHf3PIFUdUHrlG7EpR3ce6VNE'; // Replace with your actual token
  private apiUrl: string = "http://localhost:8088";

  constructor(
    private http: HttpClient
  ) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("error ", error);
    return of(null);
  }

  public get(url: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<any>(`${this.apiUrl}${url}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }
}
