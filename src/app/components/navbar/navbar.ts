// src/app/components/navbar/navbar.ts

import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../pages/service/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
  ]
})
export class NavbarComponent implements OnInit {

  // **CRITICAL: Remove these local declarations.** They are now public on authService.
  // isLoggedIn$: Observable<boolean>; 
  // currentUser$: Observable<any | null>; 

  // Injected as authService, so properties are accessed via this.authService.propertyName
  constructor(public authService: AuthService, private router: Router) { 
    // No explicit assignments here, as you'll use authService.loggedInStatus$ and authService.currentUser$ directly in the template.
  }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  public getDashboardLink(): string {
    const userRoles = this.authService.getUserRoles(); 
    if (userRoles.includes("ADMIN")) {
      return '/admin'; 
    } else if (userRoles.includes("NORMAL")) {
      return '/user-dashboard'; 
    }
    return '/'; 
  }

  // **CRITICAL FIX: This method must be called to get username**
  // It fetches the current user from authService and returns the username.
  public getUsername(): string {
    const user = this.authService.getUser(); // Get the synchronous user object
    // Access the username property, handling potential nulls
    return user && user.user && user.user.username ? user.user.username : 'Guest'; 
  }
}
