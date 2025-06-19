// src/app/pages/login/login.ts

import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

import { JwtRequest } from '../models/jwt-request.model';
// **CRITICAL FIX: Correct User model path as per your clarification**
import { User } from '../../user'; // Path from src/app/pages/login/login.ts to src/app/user.ts

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
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formSubmit() {
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
        this.loginService.setUser(data.user);

        this.snack.open("Login successful!", 'Ok', { duration: 3000 });
        this.router.navigate(['/dashboard']);
        
        this.loginService.getCurrentUser().subscribe({
          next: (user: User) => {
            console.log("Current user details fetched (via /current-user endpoint):", user);
          },
          error: (error) => {
            console.error("Error fetching current user details (via /current-user endpoint):", error);
            this.snack.open("Error fetching user details!", 'Ok', { duration: 3000 });
          }
        });

      },
      error: (error) => {
        console.log("Error!");
        console.error(error);
        this.snack.open("Invalid Credentials !! Try again", 'Ok', { duration: 3000 });
      }
    });
  }
}
