// src/app/pages/admin/pages/admin/categories/categories.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../service/src/app/service/category.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Category } from '../../../../../category';
import { MatTableModule } from '@angular/material/table'; // Added MatTableModule
import { MatDividerModule } from '@angular/material/divider'; // Added MatDividerModule

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
    MatTableModule, // Include MatTableModule
    MatDividerModule // Include MatDividerModule
  ],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['cid', 'title', 'description', 'action'];

  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe({ // Correct method name `categories()`
      next: (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories from server!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  deleteCategory(cid: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(cid).subscribe({
        next: (data) => {
          this.snack.open('Category deleted successfully!', 'OK', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
          });
          this.categories = this.categories.filter(category => category.cid !== cid);
        },
        error: (error: any) => {
          console.error('Error deleting category:', error);
          this.snack.open('Error deleting category!', 'Dismiss', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
