// src/app/pages/service/admin-guard.ts (Consider renaming this file to role.guard.ts for clarity)

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../login.service'; // Path to your LoginService

@Injectable({
  providedIn: 'root'
})
// **CRITICAL FIX: Renamed AdminGuard to RoleGuard to reflect its generic purpose**
export class RoleGuard implements CanActivate { // Renamed class

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // **CRITICAL FIX: Get the expected role from route.data**
    const requiredRole = route.data['requiredRole'] as string; // 'ADMIN' or 'NORMAL'
    
    // 1. Check if user is logged in
    if (!this.loginService.isLoggedIn()) {
      console.warn(`RoleGuard: Not logged in. Attempted access to ${state.url}. Redirecting to login.`);
      this.loginService.logout(); // Clear any partial state
      return this.router.parseUrl('/login'); // Redirect to login page
    }

    // 2. Check user role against the required role for this route
    const userRole = this.loginService.getUserRole();
    if (userRole === requiredRole) {
      console.log(`RoleGuard: User has '${userRole}' role. Access granted to ${state.url}.`);
      return true; // Allow access if user role matches required role
    } else {
      console.warn(`RoleGuard: Unauthorized access to ${state.url}. User role: '${userRole}', Required role: '${requiredRole}'. Redirecting to login.`);
      this.loginService.logout(); // Logout unauthorized users
      return this.router.parseUrl('/login'); // Redirect to login page
    }
  }
}
