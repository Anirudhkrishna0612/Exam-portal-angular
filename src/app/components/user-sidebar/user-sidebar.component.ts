// src/app/components/user-sidebar/user-sidebar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { LoginService } from '../../pages/service/login.service'; // Adjusted path (from components/user-sidebar to service)

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public logoutUser(): void {
    this.loginService.logout();
    this.snack.open('Logged out successfully !!', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['/login']);
  }
}
