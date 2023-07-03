import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private encryptionKey : string = '';

  constructor() { }

  encryptToken(token:string) {

  }
}
