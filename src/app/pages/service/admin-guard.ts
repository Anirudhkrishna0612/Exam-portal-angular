// src/app/pages/service/admin-guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
// **CRITICAL: Check and correct this path**
// If admin-guard.ts is in src/app/pages/service/
// and auth.service.ts is in src/app/service/
// then the path should be: '../../service/auth.service'
import { AuthService } from './auth.service'; // Adjust this path if necessary
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const requiredRole = route.data['requiredRole'] as string;

    if (!this.authService.isLoggedIn()) { 
      console.log('RoleGuard: User not logged in. Redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }

    const hasRole = this.authService.hasRole(requiredRole);
    if (hasRole) {
      console.log(`RoleGuard: User has '${requiredRole}' role. Access granted to ${state.url}.`);
      return true;
    } else {
      console.warn(`RoleGuard: User does NOT have '${requiredRole}' role. Access denied to ${state.url}.`);
      this.router.navigate(['/']);
      return false;
    }
  }
}
