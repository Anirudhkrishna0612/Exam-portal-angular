// src/app/components/navbar/navbar.ts

import { Component, OnInit } from '@angular/core';

// **CRITICAL FIX: Angular Material Modules for Navbar UI**
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // If you use mat-button

// **CRITICAL FIX: RouterLink and/or RouterModule for routerLink directive**
import { RouterLink, RouterModule } from '@angular/router'; // Using RouterLink is more granular for standalone

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink, // Use RouterLink directly for standalone component, or RouterModule for all router directives
    RouterModule, // Include RouterModule as well for comprehensive routing features
    // CommonModule // Generally good practice for standalone components if using *ngIf, *ngFor etc.
  ]
})
export class NavbarComponent implements OnInit { // The class name is NavbarComponent

  constructor() { }

  ngOnInit(): void {
  }

}
