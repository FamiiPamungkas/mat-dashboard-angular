import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {map, Observable} from "rxjs";
import {CryptoService} from "./crypto.service";
import {AUTH_USER_KEY, REFRESH_TOKEN_KEY, TOKEN_KEY} from "../utility/constant";
import {User} from "../model/interfaces";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private reqService: RequestService,
    private cryptoService: CryptoService,
    private storageService: StorageService,
    private router:Router
  ) {
    this.isLoggedIn = (this.cryptoService.token != "");
  }

  get authUser(): User | null {
    try {
      const user = this.storageService.getData(AUTH_USER_KEY);
      return JSON.parse(this.cryptoService.decrypt(user));
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  getToken(): string {
    return this.cryptoService.token;
  }

  getRefreshToken(): string {
    return this.cryptoService.refreshToken;
  }

  storeData(token: string, refreshToken: string, user: User) {
    this.storageService.storeData(TOKEN_KEY, this.cryptoService.encrypt(token));
    this.storageService.storeData(REFRESH_TOKEN_KEY, this.cryptoService.encrypt(refreshToken));
    this.storageService.storeData(AUTH_USER_KEY, this.cryptoService.encrypt(JSON.stringify(user)));
  }

  clearData() {
    this.storageService.removeData(TOKEN_KEY);
    this.storageService.removeData(REFRESH_TOKEN_KEY);
    this.storageService.removeData(AUTH_USER_KEY);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    }

    return this.reqService.post('/v1/auth/authenticate', loginData).pipe(
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

  refreshToken() {
    console.log("REFRESHTOKEN ="+this.getRefreshToken());
    return this.reqService.basePost('/v1/auth/refresh-token', {"token": this.getRefreshToken()});
  }

  updateToken(token:string){
    this.storageService.storeData(TOKEN_KEY, this.cryptoService.encrypt(token));
  }

  logout() {
    this.isLoggedIn = false;
    this.clearData();
    this.router.navigateByUrl("/login").then(() => false);
  }
}
