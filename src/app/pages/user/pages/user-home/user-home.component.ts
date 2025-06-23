// src/app/pages/user/user-dashboard/user-home/user-home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Keep the import for the service
import { CategoryService } from '../../../service/src/app/service/category.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';

import { Category } from '../../../../category';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    // REMOVED: MatSnackBar from imports array, as it's a service.
    MatGridListModule,
    RouterLink
  ],
  templateUrl: './user-home.html',
  styleUrls: ['./user-home.css']
})
export class UserHomeComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar // MatSnackBar is injected here as a service
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.categories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('User Home Categories loaded:', this.categories);
        if (this.categories.length === 0) {
          this.snack.open('No categories found.', 'Dismiss', { duration: 3000 });
        }
      },
      error: (error: any) => {
        console.error('Error loading categories for user home:', error);
        this.snack.open('Error loading categories from server.', 'Dismiss', { duration: 3000 });
      }
    });
  }
}
