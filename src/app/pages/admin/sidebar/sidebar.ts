// src/app/components/sidebar/sidebar.ts

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';    // For <mat-card>
import { MatListModule } from '@angular/material/list';    // For <mat-action-list>, mat-list-item, mat-subheader
import { MatIconModule } from '@angular/material/icon';    // For <mat-icon>
import { MatDividerModule } from '@angular/material/divider'; // For <mat-divider>
import { RouterLink, Router } from '@angular/router'; // For routerLink and programmatic navigation (optional, but good for debugging)
import { CommonModule } from '@angular/common'; // Needed for common directives like *ngIf, *ngFor

@Component({
  selector: 'app-sidebar',
  standalone: true, // This component is standalone
  imports: [
    CommonModule,     // Essential for Angular directives
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink        // Make routerLink directive available in the template
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar { // Ensure this class name matches the component definition

  // Inject Router for potential programmatic navigation or debugging
  constructor(private router: Router) { }

  // **CRITICAL FIX: Define the onProfileClick method here**
  onProfileClick(): void {
    console.log('Profile button clicked in sidebar!');
    // Optional: Programmatic navigation, useful if routerLink isn't working for some reason
    // this.router.navigate(['/admin/profile']); 
  }

  // Optional: Example logout method if you want to implement it later
  onLogoutClick(): void {
    console.log('Logout button clicked!');
    // Implement your logout logic here
  }
}
