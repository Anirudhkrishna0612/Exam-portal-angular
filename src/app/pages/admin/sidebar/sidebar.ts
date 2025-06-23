// src/app/pages/admin/sidebar/sidebar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Import Router, RouterLink, RouterLinkActive
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar, MatSnackBarModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatDividerModule } from '@angular/material/divider'; // Import MatDividerModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { LoginService } from '../../service/login.service'; // Adjust path

@Component({
  selector: 'app-admin-sidebar', // Assuming your admin sidebar selector
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,      // Added MatCardModule
    MatSnackBarModule,  // Added MatSnackBarModule
    RouterLink,         // Added RouterLink
    RouterLinkActive    // Added RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class AdminSidebarComponent implements OnInit { // Assuming class name

  constructor(
    public loginService: LoginService, // Public for template access if needed
    private snack: MatSnackBar,
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
  }

  public logoutAdmin(): void {
    this.loginService.logout(); // Perform logout actions
    this.snack.open('Logged out successfully !!', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['/login']); // Navigate to login page
  }
}
