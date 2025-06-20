// src/app/pages/profile/profile.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngFor etc.
import { MatCardModule } from '@angular/material/card'; // Import if you use <mat-card> in profile.html
import { MatButtonModule } from '@angular/material/button'; // Import if you use <button mat-button> etc.
import { MatIconModule } from '@angular/material/icon'; // Import if you use <mat-icon>
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-profile',
  // **CRITICAL FIX: Add standalone: true**
  standalone: true, 
  imports: [
    CommonModule,        // Essential for basic Angular features in templates
    MatCardModule,       // Required if your profile.html uses <mat-card>
    MatButtonModule,     // Required if your profile.html uses Material buttons
    MatIconModule,        // Required if your profile.html uses Material icons
    MatTableModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'] // Note: Use styleUrls (plural) as per common practice
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ProfileComponent has successfully initialized!'); // Confirm it loads
  }
}
