import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-ts';
import {REFRESH_TOKEN_KEY, TOKEN_KEY} from "../utility/constant";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private encryptionKey: string = 'KEY_ENCRIPTY';

  constructor() {
  }

  encrypt(token: string) {
    try {
      return CryptoJS.AES.encrypt(token, this.encryptionKey).toString();
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  decrypt(token: string) {
    try {
      const byte = CryptoJS.AES.decrypt(token, this.encryptionKey);
      return byte.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error(e);
      return "";
    }
  }

}
