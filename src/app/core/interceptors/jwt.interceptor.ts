import { Injectable } from '@angular/core';

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{

  constructor(private authService: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const isAuthRequest = request.url.includes('/Auth/Login') || request.url.includes('/Auth/Register');
    if (token && !isAuthRequest) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('[JwtInterceptor] Token attached to:', request.url);
      return next.handle(cloned);
    }

    return next.handle(request);
  }




}
