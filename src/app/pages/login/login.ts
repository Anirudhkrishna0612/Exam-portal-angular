// src/app/pages/login/login.ts

import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../login.service';
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
    private loginService: LoginService, // The injected service instance
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

    this.loginService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log("success");
        console.log(data);

        this.loginService.setToken(data.jwtToken);
        // Ensure data.user contains the userRoles property from your backend response
        this.loginService.setUser(data.user);

        this.snack.open("Login successful!", 'Ok', { duration: 3000 });
        
        // **CRITICAL FIX: Place role-based navigation here, after user data is set**
        // Use the injected 'loginService' instance.
        const userRole = this.loginService.getUserRole();
        console.log("User Role for Navigation:", userRole); // Debug log for the role

        if (userRole === "ADMIN") {
            // Redirect to admin dashboard
            this.router.navigate(['/admin']); // Use '/admin' as per your app.routes.ts
            this.snack.open("Welcome Admin!", 'Ok', { duration: 2000 });
        } else if (userRole === "NORMAL") {
            // Redirect to normal user dashboard
            this.router.navigate(['/user-dashboard']); // Use '/user-dashboard' as per your app.routes.ts
            this.snack.open("Welcome User!", 'Ok', { duration: 2000 });
        } else {
            // Fallback if role is not recognized or missing
            console.warn("Unknown user role or no role found. Logging out.");
            this.loginService.logout(); // Use the logout method from loginService
            this.router.navigate(['/login']); // Redirect back to login after logout
            this.snack.open("Unknown user role, logged out.", 'Ok', { duration: 3000 });
        }

        // Removed the redundant this.loginService.getCurrentUser().subscribe(...)
        // as user data (including roles) should ideally come from the initial login response.

      },
      error: (error) => {
        console.log("Error!");
        console.error(error);
        this.snack.open("Invalid Credentials !! Try again", 'Ok', { duration: 3000 });
      }
    });
  }
}
