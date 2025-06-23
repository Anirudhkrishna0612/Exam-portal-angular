// src/app/pages/signup/signup.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../user.service'; // Assuming this path and service name
import { User } from '../../user'; // Path to your User model
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup implements OnInit {

  // Initialize user with string default values for properties that will be trimmed
  public user: User = {
    id: null,
    username: '', // Explicitly initialized as empty string
    password: '', // Explicitly initialized as empty string
    firstName: '', // Explicitly initialized as empty string
    lastName: '',
    email: '',
    phone: '',
    enabled: true,
    profile: 'default.png',
    authorities: []
  };

  constructor(
    private userService: UserService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  formSubmit(): void {
    console.log(this.user);

    // Use non-null assertion or check for undefined if you expect it to be nullable
    // However, with the current initialization, these properties will always be strings.
    // The checks below are robust even if they were potentially undefined.

    // Validate username
    if (!this.user.username || this.user.username.trim() === '') {
      this.snack.open('Username is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Validate password
    if (!this.user.password || this.user.password.trim() === '') {
      this.snack.open('Password is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Validate firstName
    // Ensure firstName is a string before calling trim()
    if (!this.user.firstName || this.user.firstName.trim() === '') {
      this.snack.open('First Name is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Validate email
    if (!this.user.email || this.user.email.trim() === '') {
      this.snack.open('Email is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Validate phone
    if (!this.user.phone || this.user.phone.trim() === '') {
      this.snack.open('Phone number is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Call user service to add user
    this.userService.addUser(this.user).subscribe({
      next: (data: User) => {
        console.log(data);
        this.snack.open('Successfully Registered !!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        // Reset form after successful submission
        this.user = {
          id: null,
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          enabled: true,
          profile: 'default.png',
          authorities: []
        };
      },
      error: (error: any) => {
        console.error('Error registering user:', error);
        this.snack.open('Something went wrong! Server error.', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
