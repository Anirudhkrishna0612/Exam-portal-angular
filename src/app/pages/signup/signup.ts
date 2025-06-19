// src/app/pages/signup/signup.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// **CRITICAL: Import User model from src/app/user.ts (as you confirmed)**
import { User } from '../../user';

// **CRITICAL: Import UserService from src/app/user.service.ts (as you confirmed)**
import { UserService } from '../../user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
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
export class Signup implements OnInit {

  // Initialize public user property with default empty string values.
  // This aligns with the User interface defining username, password, etc., as 'string'.
  public user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: '' // profile is optional in User interface, but initializing as string for form binding.
  };

  constructor(
    private snack: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public formSubmit() {
    console.log("Signup form submitted!");
    console.log(this.user);

    // **CRITICAL FIX: Simplify validation checks.**
    // Since 'username' and 'password' are now explicitly 'string' in the User interface,
    // TypeScript knows they won't be 'null' or 'undefined' at this point.
    // We only need to check for empty string after trimming.
    if (this.user.username.trim() === '') {
      this.snack.open("Username is required !!", 'Ok', { duration: 3000 });
      return;
    }
    if (this.user.password.trim() === '') {
      this.snack.open("Password is required !!", 'Ok', { duration: 3000 });
      return;
    }
    // Add more validation for other fields as needed

    this.userService.addUser(this.user).subscribe({
      next: (data: User) => {
        console.log("User signed up successfully:", data);
        this.snack.open("Registration successful!", 'Ok', { duration: 3000 });
        // Reset form after successful signup
        this.user = {
            username: '', password: '', firstName: '', lastName: '',
            email: '', phone: '', profile: ''
        };
      },
      error: (error) => {
        console.error("Error during signup:", error);
        this.snack.open("Something went wrong during registration !!", 'Ok', { duration: 3000 });
      }
    });
  }
}
