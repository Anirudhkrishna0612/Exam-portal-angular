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

// User model interface (src/app/user.ts)
import { User } from '../../user';

// UserService class (src/app/user.service.ts)
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
    password: '', // Now correctly initialized as string
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: ''
    // Authorities and other backend-specific properties are not initialized here
    // as they are typically set by the backend after creation/login.
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

    // Now 'username' and 'password' are guaranteed to be strings by the User interface.
    // The .trim() will not cause 'Object is possibly undefined' error.
    if (this.user.username.trim() === '') {
      this.snack.open("Username is required !!", 'Ok', { duration: 3000 });
      return;
    }
    if (this.user.password.trim() === '') { // No longer possibly undefined
      this.snack.open("Password is required !!", 'Ok', { duration: 3000 });
      return;
    }
    // Add more validation for other fields as needed

    this.userService.addUser(this.user).subscribe({
      next: (data: User) => {
        console.log("User signed up successfully:", data);
        this.snack.open("Registration successful!", 'Ok', { duration: 3000 });
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
