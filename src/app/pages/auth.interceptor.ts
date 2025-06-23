// src/app/service/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from './service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Intercepts HTTP requests to add the JWT token to the Authorization header
   * and handles common HTTP errors like 401 Unauthorized.
   * @param request The outgoing HTTP request.
   * @param next The next interceptor in the chain.
   * @returns An Observable of the HTTP event.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.loginService.getToken(); // Get the JWT token from LoginService

    // If a token exists, clone the request and add the Authorization header
    if (token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` } // **Crucial part for adding the token**
      });
    }

    // Pass the cloned request to the next handler and catch errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error intercepted:', error);

        // Handle 401 Unauthorized or 403 Forbidden errors
        if (error.status === 401 || error.status === 403) {
          this.snack.open('Session expired or unauthorized access. Please log in again.', 'Login', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar']
          });
          this.loginService.logout(); // Clear token and user data
          this.router.navigate(['login']); // Redirect to login page
        }

        // Re-throw the error to be handled by the component's subscriber
        return throwError(() => error);
      })
    );
  }
}

// NOTE: This AuthInterceptor is already provided in app.config.ts using HTTP_INTERCEPTORS.
// You do not need to add it again to any component's providers array.
