import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-ts';
import {REFRESH_TOKEN_KEY, TOKEN_KEY} from "../utility/constant";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private encryptionKey: string = 'KEY_ENCRIPTY';

  constructor() {
  }

  private encryptToken(token: string) {
    try {
      return CryptoJS.AES.encrypt(token, this.encryptionKey).toString();
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  private decryptToken(token: string) {
    try {
      const byte = CryptoJS.AES.decrypt(token, this.encryptionKey);
      return byte.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  storeToken(token: string, refreshToken: string) {
    localStorage.setItem(TOKEN_KEY, this.encryptToken(token));
    localStorage.setItem(REFRESH_TOKEN_KEY, this.encryptToken(refreshToken));
  }


  get token(): string {
    try {
      return this.decryptToken(localStorage.getItem(TOKEN_KEY) ?? "");
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  get refreshToken(): string {
    try {
      return this.decryptToken(localStorage.getItem(REFRESH_TOKEN_KEY) ?? "");
    } catch (e) {
      console.error(e);
      return "";
    }
  }

}
