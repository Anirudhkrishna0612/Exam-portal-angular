// src/app/pages/signup/signup.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// Corrected import path
import { UserService } from '../../user.service'; // Corrected path
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card'; // FIX: Added MatCardModule


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule // FIX: Added MatCardModule
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) { } // Should resolve

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username.trim() === '' || this.user.username === null) {
      this.snack.open('Username is required !!', 'Okay', {
        duration: 3000,
      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        Swal.fire('Successfully done !!', 'user id is ' + data.id, 'success');
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.log(error);
        this.snack.open('something went wrong !!', 'Okay', {
          duration: 3000,
        });
      },
    });
  }

}
