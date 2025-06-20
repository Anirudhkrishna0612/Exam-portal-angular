// src/app/pages/profile/profile.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'; 
import { AuthService } from '../service/auth.service';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('ProfileComponent has successfully initialized!');
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const currentUserInfo = this.authService.getUser();
    
    console.log('DEBUG (ProfileComponent): currentUserInfo from AuthService.getUser():', currentUserInfo);

    if (currentUserInfo && currentUserInfo.user && currentUserInfo.user.username) {
      console.log('DEBUG (ProfileComponent): Attempting to fetch user profile for username:', currentUserInfo.user.username);
      this.userService.getUserByUsername(currentUserInfo.user.username).subscribe(
        (data: User) => {
          this.user = data;
          console.log('DEBUG (ProfileComponent): User profile data loaded successfully:', this.user);
        },
        (error) => {
          console.error('ERROR (ProfileComponent): Failed to load user profile from UserService:', error);
          this.user = null; 
        }
      );
    } else {
      console.warn('WARNING (ProfileComponent): No complete user information (or nested username) found in AuthService. Is the user logged in correctly and user object structured as expected?');
      this.user = null; 
    }
  }

  editProfile(): void {
    console.log('Edit Profile button clicked!');
  }

  getRoleString(authorities: { authority: string | null }[] | undefined): string {
    if (authorities && authorities.length > 0) {
      return authorities
        .filter(auth => auth.authority)
        .map(auth => auth.authority)
        .join(', ');
    }
    return 'N/A';
  }

  // **CRITICAL FIX: getProfileImageUrl method removed as requested.**
  // No longer needed since HTML directly provides the URL.
}
