import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {map, Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private reqService: RequestService,
    private tokenService: TokenService,
  ) {
    this.isLoggedIn = (tokenService.token != "");
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
            this.tokenService.storeToken(response.token, response.refreshToken);
            this.isLoggedIn = true;
          }
          return response;
        }
      )
    );
  }
}
