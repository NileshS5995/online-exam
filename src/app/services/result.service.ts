import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private results = [];
  constructor() { }

  setResult(result) {
    this.results = result;
    return new Observable((observer) => {
      const response = { success: false, error: '', data: [] };
      if (this.results) {
        response.data = this.results;
        response.success = true;
      }
      observer.next(response);
    });
  }

  getResult() {
    return new Observable((observer) => {
      const response = { success: false, error: '', data: [] };
      if (this.results) {
        response.data = this.results;
        response.success = true;
      }
      observer.next(response);
    });
  }
}


