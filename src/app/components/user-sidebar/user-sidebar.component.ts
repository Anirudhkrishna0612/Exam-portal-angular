// src/app/pages/user/user-dashboard/user-sidebar/user-sidebar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterLink and RouterLinkActive
import { LoginService } from '../../pages/service/login.service'; // Adjust path as needed

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,        // Add RouterLink to imports
    RouterLinkActive   // Add RouterLinkActive to imports
  ],
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public logoutUser() {
    this.loginService.logout();
    // Redirect to login page or home page after logout
    this.router.navigate(['/login']); // Or whichever route your login page is
  }
}
