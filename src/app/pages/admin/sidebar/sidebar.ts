// src/app/components/sidebar/sidebar.ts

import { Component, OnInit } from '@angular/core'; // Ensure OnInit is imported for ngOnInit lifecycle hook
import { CommonModule } from '@angular/common';   // Essential for Angular directives like *ngIf, *ngFor
import { RouterLink, Router } from '@angular/router'; // For routerLink and programmatic navigation
// Material Modules
import { MatCardModule } from '@angular/material/card';         // For <mat-card>
import { MatListModule } from '@angular/material/list';         // For <mat-action-list>, mat-list-item, mat-subheader
import { MatIconModule } from '@angular/material/icon';         // For <mat-icon>
import { MatDividerModule } from '@angular/material/divider';   // For <mat-divider>

import { AuthService } from '../../service/auth.service'; // **CRITICAL: Correct path to AuthService**

@Component({
  selector: 'app-sidebar',
  standalone: true, // This component is standalone
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit { // Implement OnInit interface


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log('Sidebar component initialized.');
  }


  public logout(): void {
    console.log('Sidebar: Logout button clicked!');
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  
}}
