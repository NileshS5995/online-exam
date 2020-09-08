import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable , throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../services/auth.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public authSrvice: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    return next.handle(request).pipe(catchError(err => {

      console.log('ErrorInterceptor:', err);
      if (err.status === 401) {
          // auto logout if 401 response returned from api
          // this.authenticationService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
      }));
    }
}
