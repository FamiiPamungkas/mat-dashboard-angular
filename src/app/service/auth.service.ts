import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private reqService: RequestService
  ) {
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    }

    return this.reqService.post('/api/v1/auth/authenticate', loginData).pipe(
      map(response => {
          console.log("RESPONSE", response);
          if (response.status == null && response.token != null && response.refreshToken != null) {
            localStorage.setItem('token', response.token);
          }
          return response;
        }
      )
    );
  }
}
