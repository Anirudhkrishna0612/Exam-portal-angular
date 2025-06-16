import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Needed for *ngIf if you were to use it elsewhere
import { FormsModule } from '@angular/forms'; // Crucial for form handling
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // SnackBar imports

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, // Required for Angular directives like *ngIf, *ngFor
    FormsModule,  // Required for template-driven forms and (ngSubmit) to fully work
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule // Add MatSnackBarModule here
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  // Inject MatSnackBar service into the constructor
  constructor(private snackBar: MatSnackBar) {
    console.log('Signup Component Initialized'); // This should appear in your browser console on page load
  }

  formSubmit(): void {
    // This is the first line that should execute when the form submits
    console.log('--- formSubmit() function called! ---');

    // Open a SnackBar to confirm submission
    this.snackBar.open('Form submitted successfully!', 'Dismiss', {
      duration: 3000, // Show for 3 seconds
      horizontalPosition: 'center', // Position the snackbar
      verticalPosition: 'bottom',
    });

    // Add your actual form data handling or API call here later
    // For example:
    // console.log('Form data:', this.user); // If you had ngModel bindings
  }
}