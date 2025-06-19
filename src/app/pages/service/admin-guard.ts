// src/app/pages/service/admin-guard.ts (Confirmed file path)

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'; // Import Router
import { Observable } from 'rxjs';
import { LoginService } from '../../login.service'; // Path from src/app/pages/service/ to src/app/login.service.ts

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {} // Inject Router

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.loginService.isLoggedIn()) {
      console.warn("AdminGuard: Not logged in. Redirecting to login.");
      this.loginService.logout();
      return this.router.parseUrl('/login'); // Redirect to login page
    }

    const userRole = this.loginService.getUserRole();
    if (userRole === "ADMIN") {
      return true; // Allow access for ADMIN
    } else {
      console.warn("AdminGuard: Unauthorized access. User role:", userRole, ". Redirecting to login.");
      this.loginService.logout(); // Logout unauthorized users
      return this.router.parseUrl('/login'); // Redirect to login page
    }
  }
}
