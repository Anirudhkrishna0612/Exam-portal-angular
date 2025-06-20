// src/app/pages/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS // Import HTTP_INTERCEPTORS token
} from '@angular/common/http';
import { Observable } from 'rxjs';
// **CRITICAL FIX: Corrected import path for AuthService**
import { AuthService } from './service/auth.service'; // From pages/auth.interceptor.ts, go up two levels to app/, then into service/

@Injectable() // This decorator is necessary for DI
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {} // Constructor injection is correct

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Interceptor: Inside interceptor");
    const token = this.authService.getToken(); // Use authService.getToken()

    if (token) {
      console.log("Interceptor: Token found, adding to headers.");
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      console.log("Interceptor: No token found.");
    }

    return next.handle(request);
  }
}

// **No longer needed for standalone apps, but kept for context: **
// export const AuthInterceptorProviders = [ // This was the old way with NgModules
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: AuthInterceptor,
//     multi: true,
//   },
// ];
