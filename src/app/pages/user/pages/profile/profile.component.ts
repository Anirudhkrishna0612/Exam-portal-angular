// src/app/pages/user/pages/profile/profile.component.ts

import { Component, OnInit } from '@angular/core'; // Removed OnDestroy as it's not needed for synchronous calls
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../../../pages/service/login.service';
import { User } from '../../../../user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// Removed Observable-related imports
// import { takeUntil } from 'rxjs/operators';
// import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { // Removed OnDestroy interface

  user: User | null = null;
  profileImageUrl: SafeUrl | undefined;
  // Removed private destroy$
  // private destroy$ = new Subject<void>();

  constructor(
    private loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // CRITICAL REVERSION: Use the synchronous getCurrentUser() method
    this.user = this.loginService.getCurrentUser();

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
  }

  // Removed ngOnDestroy
  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
}
