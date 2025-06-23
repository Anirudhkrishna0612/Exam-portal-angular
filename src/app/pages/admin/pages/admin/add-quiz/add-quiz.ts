// src/app/pages/admin/pages/admin/add-quiz/add-quiz.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// --- CORRECTED IMPORT PATHS FOR FLAT STRUCTURE ---
import { CategoryService } from '../../../../service/src/app/service/category.service';
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { Quiz } from '../../../../../quiz';
import { Category } from '../../../../../category';
// --- END CORRECTED IMPORT PATHS ---
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider'; // Added MatDividerModule

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
    MatDividerModule
  ],
  templateUrl: './add-quiz.html',
  styleUrls: ['./add-quiz.css']
})
export class AddQuizComponent implements OnInit {

  categories: Category[] = [];
  quizData: Quiz = new Quiz();

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private snack: MatSnackBar // The error "No suitable injection token for parameter 'snack'" implies MatSnackBar was not recognized as injectable, but it's correct here. This should resolve with correct imports.
  ) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories from server!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  formSubmit(): void {
    if (!this.quizData.title || this.quizData.title.trim() === '') {
      this.snack.open('Title is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.quizData.description || this.quizData.description.trim() === '') {
      this.snack.open('Description is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (this.quizData.maxMarks === undefined || this.quizData.maxMarks <= 0) {
      this.snack.open('Maximum Marks must be a positive number!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (this.quizData.numberOfQuestions === undefined || this.quizData.numberOfQuestions <= 0) {
      this.snack.open('Number of Questions must be a positive number!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.quizData.category || this.quizData.category.cid === undefined) {
      this.snack.open('Category is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe({
      next: (data: Quiz) => {
        this.snack.open('Quiz added successfully!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        this.quizData = new Quiz();
        this.quizData.category = undefined;
      },
      error: (error: any) => {
        console.error('Error adding quiz:', error);
        this.snack.open('Error adding quiz! Server error.', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
