import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.authData;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${user.authData}`
            }
        });
    }

    return next.handle(request);
  }
}


