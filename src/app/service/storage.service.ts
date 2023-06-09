import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  storeData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string): string {
    return localStorage.getItem(key) ?? "";
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
