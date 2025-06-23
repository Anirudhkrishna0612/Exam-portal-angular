// src/app/pages/admin/pages/admin/categories/categories.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
// Corrected import path
import { CategoryService } from '../../../../../service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router'; // Keep this if used in template
import { Category } from '../../../../../category';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []; // Type this array
  displayedColumns: string[] = ['cid', 'title', 'description', 'actions'];

  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { } // Should resolve

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.log(error);
        Swal.fire('Error !!', 'Error in loading categories', 'error');
      }
    });
  }

  deleteCategory(cid: number) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(cid).subscribe({
          next: (data: any) => {
            this.snack.open('Category Deleted Successfully', 'Ok', {
              duration: 3000,
            });
            this.categories = this.categories.filter((category: any) => category.cid !== cid);
          },
          error: (error: any) => { // TS7006 fix: added : any
            this.snack.open('Error in deleting category', 'Ok', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
