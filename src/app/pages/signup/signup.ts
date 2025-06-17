import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../user.service'; // Path now correct
import { User } from '../../user.model';     // Path now correct
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit {

  public user: User = {
    username: '',
    password: '', // Initialize password as empty string to avoid undefined error during initialization
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(private snackBar: MatSnackBar, private userService: UserService) {
    console.log('Signup Component Initialized');
  }

  ngOnInit(): void {
    // Initialization logic
  }

  formSubmit(): void {
    console.log(this.user); // Log the user data for debugging

    // Basic validation for username
    if (this.user.username.trim() === '' || this.user.username === null) {
      this.snackBar.open('Username is required !!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    // Basic validation for password
    // ADDED CHECK: this.user.password && before .trim() to handle possible undefined/null
    if (!this.user.password || this.user.password.trim() === '') {
        this.snackBar.open('Password is required !!', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
        return;
    }
    if (!this.user.firstName || this.user.firstName.trim() === '') {
        this.snackBar.open('Name is required !!', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
        return;
    }
    if (!this.user.email || this.user.email.trim() === '') {
        this.snackBar.open('email is required !!', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
        return;
    }
    

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        // --- CHANGE START ---
        // Replace MatSnackBar success message with SweetAlert
        Swal.fire('Success', 'Registered successfully! User ID :'+ data.id, 'success').then((result) => {
          // Optional: You can add actions after the SweetAlert closes, e.g., navigate
          // if (result.isConfirmed) {
          //   // Do something after user clicks OK
          // }
        });
        // Clear the form fields after successful registration
        this.user = {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        };
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        // You can add more specific error handling here based on error.status or error.error
        this.snackBar.open('Something went wrong !!', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
