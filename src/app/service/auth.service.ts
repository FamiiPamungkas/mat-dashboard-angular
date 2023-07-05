import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {map, Observable} from "rxjs";
import {CryptoService} from "./crypto.service";
import {AUTH_USER_KEY, REFRESH_TOKEN_KEY, TOKEN_KEY} from "../utility/constant";
import {User} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private reqService: RequestService,
    private cryptoService: CryptoService,
  ) {
    this.isLoggedIn = (this.token != "");
  }

  get token(): string {
    try {
      return this.cryptoService.decrypt(localStorage.getItem(TOKEN_KEY) ?? "");
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  get refreshToken(): string {
    try {
      return this.cryptoService.decrypt(localStorage.getItem(REFRESH_TOKEN_KEY) ?? "");
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  get authUser(): User | null {
    try {
      const user = localStorage.getItem(AUTH_USER_KEY) ?? "";
      return JSON.parse(this.cryptoService.decrypt(user));
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  storeData(token: string, refreshToken: string, user: User) {
    localStorage.setItem(TOKEN_KEY, this.cryptoService.encrypt(token));
    localStorage.setItem(REFRESH_TOKEN_KEY, this.cryptoService.encrypt(refreshToken));
    localStorage.setItem(AUTH_USER_KEY, this.cryptoService.encrypt(JSON.stringify(user)));
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    }

    return this.reqService.post('/api/v1/auth/authenticate', loginData).pipe(
      map(response => {
          if (response.status == null && response.token != null && response.refreshToken != null) {
            this.storeData(
              response.token,
              response.refreshToken,
              response.user
            );
            this.isLoggedIn = true;
          }
          return response;
        }
      )
    );
  }
}
