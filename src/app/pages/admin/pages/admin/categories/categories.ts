// src/app/pages/admin/pages/admin/categories/categories.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../../service/src/app/service/category.service'; // Adjust path
import { RouterLink, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Category } from '../../../../../category'; // Import your Category class


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []; // Explicitly type categories array

  displayedColumns: string[] = ['cid', 'title', 'description', 'actions']; // Use 'cid' for column definition

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    // IMPORTANT FIX: Reload categories every time this component is activated.
    // This handles cases where categories are added/deleted from other routes.
    this.route.paramMap.subscribe(() => {
      this.loadCategories();
    });
  }

  loadCategories() {
    this.categoryService.categories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories from server', 'Dismiss', { duration: 3000 });
      }
    });
  }

  deleteCategory(cid: any) { // Use cid for the parameter
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(cid).subscribe({
        next: (data: any) => {
          this.categories = this.categories.filter((category: Category) => category.cid !== cid); // Use cid
          this.snack.open('Category deleted successfully !!', 'OK', { duration: 3000 });
        },
        error: (error: any) => {
          console.error('Error deleting category:', error);
          this.snack.open('Error deleting category !!', 'Dismiss', { duration: 3000 });
        }
      });
    }
  }

}
