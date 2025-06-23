// src/app/components/confirm-dialog/confirm-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // For CommonModule
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; // For dialog functionality
import { MatButtonModule } from '@angular/material/button'; // For buttons

// Interface to define the data structure passed to the dialog
export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, // Include MatDialogModule for dialog features
    MatButtonModule  // Include MatButtonModule for the buttons
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Confirm</button>
    </mat-dialog-actions>
  `,
  styles: `
    /* Basic styling for the dialog content */
    mat-dialog-title {
      color: #3F51B5; /* Primary color */
    }
    mat-dialog-content {
      margin-bottom: 20px;
    }
    mat-dialog-content p {
      font-size: 1.1em;
      color: #555;
    }
    mat-dialog-actions button {
      margin-left: 8px;
    }
  `
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData // Inject data passed to the dialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Close dialog without confirmation (false)
  }
}
