import { Injectable } from '@angular/core';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService extends StorageService {

  constructor() {
    super();
  }

  setItem(key: string, value: unknown): void {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
      }
    } catch (error) {
      
    }

  }

  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as T;
      }
    } catch (error) {
      
    }
    return null;

  }

  clear(): void {
    localStorage.clear();
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  get length(): number {
    return localStorage.length;
  }
}
