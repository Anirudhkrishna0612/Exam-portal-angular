// src/app/pages/login/login.ts

import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service'; // Correct import path for AuthService
import { Router } from '@angular/router';

import { JwtRequest } from '../models/jwt-request.model';
import { User } from '../../user'; // Confirmed path to User model

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class LoginComponent implements OnInit {

  public loginData: JwtRequest = {
    username: '',
    password: ''
  };

  constructor(
    private snack: MatSnackBar,
    private authService: AuthService, // The injected service instance
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("DEBUG: formSubmit() method was triggered!");
    console.log("login btn clicked");

    if (this.loginData.username.trim() === '') {
      this.snack.open("Username is required !!", 'Ok', { duration: 3000 });
      return;
    }

    if (this.loginData.password.trim() === '') {
      this.snack.open("Password is required !!", 'Ok', { duration: 3000 });
      return;
    }

    this.authService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log("success");
        console.log(data);

        // **CRITICAL FIX: REMOVE these lines. authService.generateToken handles storage internally.**
        // this.authService.setToken(data.jwtToken); // Property 'setToken' does not exist on type 'AuthService'.
        // this.authService.setUser(data.user); // Property 'setUser' does not exist on type 'AuthService'.

        this.snack.open("Login successful!", 'Ok', { duration: 3000 });
        
        // **CRITICAL FIX: Use getUserRoles() (plural) instead of getUserRole()**
        const userRoles = this.authService.getUserRoles(); // Correct method name
        console.log("User Role for Navigation:", userRoles); // Debug log for the role

        if (userRoles.includes("ADMIN")) { // Check if the array includes "ADMIN"
            this.router.navigate(['/admin']);
            this.snack.open("Welcome Admin!", 'Ok', { duration: 2000 });
        } else if (userRoles.includes("NORMAL")) { // Check if the array includes "NORMAL"
            this.router.navigate(['/user-dashboard']);
            this.snack.open("Welcome User!", 'Ok', { duration: 2000 });
        } else {
            console.warn("Unknown user role or no role found. Logging out.");
            this.authService.logout(); // Use the logout method from authService
            this.router.navigate(['/login']); // Redirect back to login after logout
            this.snack.open("Unknown user role, logged out.", 'Ok', { duration: 3000 });
        }
      },
      error: (error) => {
        console.log("Error!");
        console.error(error);
        this.snack.open("Invalid Credentials !! Try again", 'Ok', { duration: 3000 });
      }
    });
  }
}
