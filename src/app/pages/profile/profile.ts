// src/app/pages/profile/profile.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
// No longer need MatSnackBar, Router, DomSanitizer, SafeUrl if only displaying basic info
// Re-add them if you have profile.html content that uses them.
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Needed for profile image

import { User } from '../../user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  profileImageUrl: SafeUrl | undefined; // For the profile image

  constructor(
    private loginService: LoginService,
    private snack: MatSnackBar, // Re-added if your HTML uses it for alerts
    private router: Router, // Re-added if your HTML has navigation
    private sanitizer: DomSanitizer // Re-added for profile image URL
  ) { }

  ngOnInit(): void {
    // Get current user details from LoginService (synchronous call)
    this.user = this.loginService.getCurrentUser(); // This now returns User | null directly

    // Logic to set profile image URL (from previous working code)
    if (this.user?.profile) {
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.user.profile);
    } else {
      const initial = (this.user?.username && this.user.username.trim() !== '')
                      ? this.user.username.charAt(0).toUpperCase()
                      : '?';
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        `https://placehold.co/100x100/424242/FFFFFF?text=${initial}`
      );
    }

    // Removed the 'if (!this.user) { this.loginService.getCurrentUser().subscribe(...)' block
    // because LoginService.getCurrentUser() is now synchronous and handles its own fetching/storage.
    // If user is null here, it means they are not logged in or data is corrupted, which your
    // LoginService.getUser() should already handle by potentially logging them out.
  }

  // Add any other methods for profile editing, etc. here
}
