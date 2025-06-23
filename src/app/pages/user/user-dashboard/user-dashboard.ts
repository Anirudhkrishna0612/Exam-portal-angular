// src/app/pages/user/user-dashboard/user-dashboard.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component'; // Adjust path
import { LoginService } from '../../service/login.service'; // Adjust path
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    UserSidebarComponent,
    MatSnackBarModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent {

  constructor(
    public loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  public logoutUserFromToolbar(): void {
    this.loginService.logout();
    this.snack.open('Logged out successfully !!', 'OK', {
      duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
    });
    this.router.navigate(['/login']);
  }
}
