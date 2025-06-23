// src/app/pages/admin/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AdminSidebarComponent } from '../sidebar/sidebar'; // AdminSidebarComponent confirmed
import { RouterOutlet } from '@angular/router'; // Direct import for <router-outlet>

// Import Angular Material Sidenav Modules
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    AdminSidebarComponent,
    RouterOutlet, // Use RouterOutlet for main content
    MatSidenavModule, // Required for mat-sidenav-container, mat-sidenav, mat-sidenav-content
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
