// src/app/pages/admin/pages/admin/add-category/add-category.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../service/category.service';
import Swal from 'sweetalert2';
// Removed RouterLink import as per warning if not used in template
// import { RouterLink } from '@angular/router'; // Removed this line if not used

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    // Removed RouterLink from imports as per warning if not used in template
  ],
  templateUrl: './add-category.html',
  styleUrls: ['./add-category.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() === '' || this.category.title === null) {
      this.snack.open('Title required!', 'Dismiss', {
        duration: 3000,
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe({
      next: (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !!', 'Category is added successfully', 'success');
      },
      error: (error: any) => {
        console.log(error);
        this.snack.open('Something went wrong !!', 'Dismiss', {
          duration: 3000,
        });
      }
    });
  }
}
