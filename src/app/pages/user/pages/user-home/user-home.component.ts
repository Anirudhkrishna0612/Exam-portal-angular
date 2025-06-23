// src/app/pages/user/pages/user-home/user-home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

// FIX: Import MatGridListModule
import { MatGridListModule } from '@angular/material/grid-list';

import { CategoryService } from '../../../../service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Category } from '../../../../category';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    RouterLink,
    MatGridListModule // ADDED
  ],
  templateUrl: './user-home.html',
  styleUrls: ['./user-home.css']
})
export class UserHomeComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading categories from server', 'error');
      }
    });
  }
}
