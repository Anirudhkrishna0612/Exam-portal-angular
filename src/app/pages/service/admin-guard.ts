// src/app/pages/service/admin-guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'; // Adjust path if login.service.ts is elsewhere
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  /**
   * Determines if the route can be activated.
   * Checks if the user is logged in and has the 'ADMIN' role.
   * @param route The activated route snapshot.
   * @param state The router state snapshot.
   * @returns An Observable, Promise, or boolean indicating if the route can be activated.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.isLoggedIn() && this.loginService.getUserRole() === 'ADMIN') {
      return true; // User is logged in and is an admin
    }

    // User is not logged in or not an admin, redirect to login page
    this.snack.open('You do not have administrative access. Please log in as an Admin.', 'Denied', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });
    this.router.navigate(['login']);
    return false;
  }
}
