// src/app/pages/admin/update-category/update-category.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// FIX: Import MatDividerModule
import { MatDividerModule } from '@angular/material/divider';

import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';
import { Category } from '../../../category';


@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule // ADDED
  ],
  templateUrl: './update-category.html',
  styleUrls: ['./update-category.css']
})
export class UpdateCategoryComponent implements OnInit {

  cId: number = 0;
  category: Category = {
    title: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cIdParam = params.get('cId');
      if (cIdParam) {
        this.cId = +cIdParam;
        this.categoryService.getCategory(this.cId).subscribe({
          next: (data: Category) => {
            this.category.cid = data.cid;
            this.category.title = data.title ?? '';
            this.category.description = data.description ?? '';
          },
          error: (error: any) => {
            console.error('Error loading category:', error);
            this.snack.open('Error loading category details!', 'Dismiss', { duration: 3000 });
            this.router.navigate(['/admin/categories']);
          }
        });
      } else {
        this.snack.open('Category ID not found in route.', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/categories']);
      }
    });
  }

  formSubmit() {
    if (String(this.category.title).trim() === '') {
      this.snack.open('Title required!', 'Dismiss', {
        duration: 3000,
      });
      return;
    }

    this.categoryService.updateCategory(this.category).subscribe({
      next: (data: any) => {
        Swal.fire('Success !!', 'Category updated successfully', 'success').then((e) => {
          this.router.navigate(['/admin/categories']);
        });
      },
      error: (error: any) => {
        console.log(error);
        this.snack.open('Something went wrong !!', 'Dismiss', {
          duration: 3000,
        });
      },
    });
  }
}
