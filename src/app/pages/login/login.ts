// src/app/pages/login/login.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../service/login.service'; // Keeping this path as per your file
// FIX: Corrected User model path
import { User } from '../../user';// Assuming User model is in src/app/models/user.ts
// FIX: Corrected JwtRequest model path
import { JwtRequest } from '../models/jwt-request.model'; // Assuming JwtRequest is in src/app/models/jwt-request.model.ts
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginData: JwtRequest = {
    username: '',
    password: ''
  };

  private userSubscription: Subscription | undefined;

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  formSubmit(): void {
    console.log('Login data submitted:', this.loginData);

    if (!this.loginData.username || this.loginData.username.trim() === '') {
      this.snack.open('Username is required !!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (!this.loginData.password || String(this.loginData.password).trim() === '') {
      this.snack.open('Password is required !!', 'Dismiss', { duration: 3000 });
      return;
    }

    this.loginService.generateToken(this.loginData).pipe(
      switchMap((tokenResponse: any) => {
        if (tokenResponse && tokenResponse.token && tokenResponse.user) {
          this.loginService.loginUser(tokenResponse.token, tokenResponse.user);
          console.log('Token and user saved:', tokenResponse);
          return this.loginService.fetchUserFromServer();
        } else {
          throw new Error('Invalid token response format from backend.');
        }
      })
    ).subscribe({
      next: (user: User) => {
        console.log('User details fetched after login:', user);
        if (this.loginService.getUserRole() === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (this.loginService.getUserRole() === 'NORMAL') {
          this.router.navigate(['/user']); // Navigate to the base user dashboard path
        } else {
          this.loginService.logout();
          this.snack.open('Invalid credentials or no role assigned!', 'Dismiss', { duration: 3000 });
        }
      },
      error: (error: any) => {
        console.error('Login error or Error fetching user details:', error);
        this.loginService.logout();
        if (error.status === 401) {
          this.snack.open('Invalid Username or Password !!', 'Dismiss', { duration: 3000 });
        } else {
          this.snack.open('Server error. Could not log in.', 'Dismiss', { duration: 3000 });
        }
      }
    });
  }
}
