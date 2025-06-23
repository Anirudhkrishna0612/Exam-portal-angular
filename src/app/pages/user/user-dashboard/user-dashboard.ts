// src/app/pages/user/user-dashboard/user-dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component'; // Assuming this is your user sidebar
import { RouterOutlet } from '@angular/router'; // For <router-outlet> in HTML

// FIX: Import MatSidenavModule for Angular Material Sidenav components
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    UserSidebarComponent, // Assuming this is the correct selector
    RouterOutlet, // For <router-outlet>
    MatSidenavModule // FIX: Add MatSidenavModule here
  ],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
