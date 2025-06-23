// src/app/pages/admin/pages/admin/update-quiz/update-quiz.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../../../service/category.service';
import { QuizService } from '../../../../../service/quiz.service';
import Swal from 'sweetalert2';
import { Quiz } from '../../../../../quiz';
import { Category } from '../../../../../category';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Ensure MatSlideToggleModule is imported


@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule // Add MatSlideToggleModule
  ],
  templateUrl: './update-quiz.html',
  styleUrls: ['./update-quiz.css']
})
export class UpdateQuizComponent implements OnInit {

  qId: number = 0;
  quiz: Quiz = {
    title: '',
    description: '',
    maxMarks: 0,
    numberOfQuestions: 0,
    active: false,
    category: undefined
  };
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      if (qIdParam) {
        this.qId = +qIdParam;
        this.loadQuizData();
      } else {
        this.snack.open('Quiz ID not found in route.', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/quizzes']);
      }
    });

    this.loadCategories();
  }

  loadQuizData(): void {
    this.quizService.getQuiz(this.qId).subscribe({
      next: (data: Quiz) => {
        this.quiz = data;
        this.quiz.maxMarks = data.maxMarks ?? 0;
        this.quiz.numberOfQuestions = data.numberOfQuestions ?? 0;
        console.log('Loaded Quiz:', this.quiz);
      },
      error: (error: any) => {
        console.error('Error loading quiz:', error);
        this.snack.open('Error loading quiz details!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/quizzes']);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  public updateQuizSubmit(): void {
    if (this.quiz.title.trim() === '' || this.quiz.description.trim() === '') {
      this.snack.open('Title and Description are required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (this.quiz.maxMarks === undefined || this.quiz.maxMarks <= 0) {
        this.snack.open('Max Marks must be greater than 0!', 'Dismiss', { duration: 3000 });
        return;
    }
    if (this.quiz.numberOfQuestions === undefined || this.quiz.numberOfQuestions <= 0) {
        this.snack.open('Number of Questions must be greater than 0!', 'Dismiss', { duration: 3000 });
        return;
    }
    if (!this.quiz.category || !this.quiz.category.cid) {
      this.snack.open('Category must be selected!', 'Dismiss', { duration: 3000 });
      return;
    }

    this.quizService.updateQuiz(this.quiz).subscribe({
      next: (data: Quiz) => {
        Swal.fire('Success', 'Quiz updated successfully!', 'success').then((e) => {
          this.router.navigate(['/admin/quizzes']);
        });
      },
      error: (error: any) => {
        console.error('Error updating quiz:', error);
        Swal.fire('Error', 'Error updating quiz!', 'error');
      }
    });
  }

  // FIX: Define compareFn in TypeScript
  compareFn(o1: Category, o2: Category): boolean {
    return o1 && o2 ? o1.cid === o2.cid : o1 === o2;
  }
}
