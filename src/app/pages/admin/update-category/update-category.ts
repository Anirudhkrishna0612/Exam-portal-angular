// src/app/pages/admin/update-category/update-category.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../service/src/app/service/category.service';
import { Category } from '../../../category';
import { MatDividerModule } from '@angular/material/divider'; // Added for mat-divider in HTML

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './update-category.html',
  styleUrls: ['./update-category.css']
})
export class UpdateCategoryComponent implements OnInit {

  cId: number | undefined;
  category: Category = new Category();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cId = Number(this.route.snapshot.paramMap.get('cid'));

    this.categoryService.getCategory(this.cId).subscribe({
      next: (data: Category) => {
        this.category = data;
      },
      error: (error: any) => {
        console.error('Error loading category:', error);
        this.snack.open('Error loading category!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/categories']);
      }
    });
  }

  formSubmit(): void { // Corrected method name `formSubmit`
    if (!this.category.title || this.category.title.trim() === '') {
      this.snack.open('Title is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.category.description || this.category.description.trim() === '') {
      this.snack.open('Description is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    this.categoryService.updateCategory(this.category).subscribe({
      next: (data: Category) => {
        this.snack.open('Category updated successfully!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        this.router.navigate(['/admin/categories']);
      },
      error: (error: any) => {
        console.error('Error updating category:', error);
        this.snack.open('Error updating category!', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
