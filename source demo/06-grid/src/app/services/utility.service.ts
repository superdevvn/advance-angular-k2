import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  x: number;
  y: number;
  constructor() {
    this.x = 2;
    this.y = 3;
  }

  sum(a: number, b: number) {
    return a + b;
  }
}
