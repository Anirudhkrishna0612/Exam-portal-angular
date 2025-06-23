// src/app/pages/admin/pages/admin/update-quiz/update-quiz.ts

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
import { CategoryService } from '../../../../service/src/app/service/category.service';
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { Quiz } from '../../../../../quiz';
import { Category } from '../../../../../category';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider'; // Add MatDividerModule if used in HTML

@Component({
  selector: 'app-update-quiz',
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
    MatDividerModule // Include MatDividerModule
  ],
  templateUrl: './update-quiz.html',
  styleUrls: ['./update-quiz.css']
})
export class UpdateQuizComponent implements OnInit {

  quizId: number | undefined;
  quizData: Quiz = new Quiz();
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));

    this.quizService.getQuiz(this.quizId).subscribe({
      next: (data: Quiz) => {
        this.quizData = data;
        console.log('Quiz data loaded for update:', this.quizData);
      },
      error: (error: any) => {
        console.error('Error loading quiz for update:', error);
        this.snack.open('Error loading quiz for update!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/quizzes']);
      }
    });

    this.categoryService.categories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  compareCategories(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.cid === c2.cid : c1 === c2;
  }

  updateQuiz(): void {
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

    this.quizService.updateQuiz(this.quizData).subscribe({
      next: (data: Quiz) => {
        this.snack.open('Quiz updated successfully!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        this.router.navigate(['/admin/quizzes']);
      },
      error: (error: any) => {
        console.error('Error updating quiz:', error);
        this.snack.open('Error updating quiz! Server error.', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
