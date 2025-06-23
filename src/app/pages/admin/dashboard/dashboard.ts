// src/app/pages/admin/dashboard/dashboard.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, Router, RouterLink } from '@angular/router'; // Import RouterOutlet and RouterLink
import { LoginService } from '../../service/login.service'; // Adjust path
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
// CRITICAL FIX: Corrected import name from SidebarComponent to AdminSidebarComponent
import { AdminSidebarComponent } from '../sidebar/sidebar'; // Assuming sidebar.ts exports AdminSidebarComponent

@Component({
  selector: 'app-dashboard', // Assuming your admin dashboard selector is app-dashboard
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,        // For rendering child routes
    RouterLink,          // For [routerLink] in toolbar
    MatSnackBarModule,
    AdminSidebarComponent // CRITICAL FIX: Use the correct component class name here
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard { // Your Admin Dashboard component class name

  constructor(
    public loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  public logoutAdminFromToolbar(): void {
    this.loginService.logout();
    this.snack.open('Logged out successfully !!', 'OK', {
      duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
    });
    this.router.navigate(['/login']);
  }
}
