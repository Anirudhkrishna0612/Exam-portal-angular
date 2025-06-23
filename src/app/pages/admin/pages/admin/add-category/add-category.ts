// src/app/pages/admin/pages/admin/add-category/add-category.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from '../../../../service/src/app/service/category.service';
import { Category } from '../../../../../category';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider'; // Added for mat-divider in HTML

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
    MatDividerModule
  ],
  templateUrl: './add-category.html',
  styleUrls: ['./add-category.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    // No initial data loading needed for adding a category
  }

  formSubmit(): void { // Method is now correctly named `formSubmit`
    if (!this.category.title || this.category.title.trim() === '') {
      this.snack.open('Title is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.category.description || this.category.description.trim() === '') {
      this.snack.open('Description is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe({
      next: (data: Category) => { // Type is now consistent
        this.snack.open('Category added successfully!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        this.category = new Category();
      },
      error: (error: any) => {
        console.error('Error adding category:', error);
        this.snack.open('Error adding category! Server error.', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
