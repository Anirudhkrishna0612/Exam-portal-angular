// src/app/pages/login/login.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../pages/service/login.service';
import { User } from '../../user';
import { JwtRequest } from '../models/jwt-request.model';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Import switchMap for chaining observables

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
    // No subscription to user changes needed here, login component is for direct login
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

    if (!this.loginData.password || (typeof this.loginData.password === 'string' && this.loginData.password.trim() === '')) {
      this.snack.open('Password is required !!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Chain the token generation and user fetch using switchMap
    this.loginService.generateToken(this.loginData).pipe(
      switchMap((tokenResponse: any) => {
        // First, save the token and user data from the generate-token response
        // Assuming tokenResponse directly contains { token: "...", user: {...} }
        // CRITICAL: Ensure 'loginUser' method saves the token to localStorage
        this.loginService.loginUser(tokenResponse.token, tokenResponse.user);
        console.log('Login success: ', tokenResponse); // Log what was received

        // Now, after the token is saved, proceed to fetch current user from server.
        // The interceptor should now be able to pick up the token.
        return this.loginService.fetchUserFromServer();
      })
    ).subscribe({
      next: (user: User) => {
        console.log('User details fetched after login:', user);
        // LoginUser already called in switchMap, so now just redirect.

        if (this.loginService.getUserRole() === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (this.loginService.getUserRole() === 'NORMAL') {
          this.router.navigate(['/user/0']);
        } else {
          this.loginService.logout();
          this.snack.open('Invalid credentials or no role assigned!', 'Dismiss', { duration: 3000 });
        }
      },
      error: (error: any) => {
        console.error('Login error or Error fetching user details:', error);
        this.loginService.logout();
        this.snack.open('Invalid Details !! Try again.', 'Dismiss', { duration: 3000 });
      }
    });
  }
}
