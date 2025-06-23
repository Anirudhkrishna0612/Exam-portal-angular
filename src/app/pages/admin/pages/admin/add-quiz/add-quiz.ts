// src/app/pages/admin/pages/admin/add-quiz/add-quiz.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Corrected import paths based on the 'service' folder now being directly under 'src/app'
import { QuizService } from '../../../../../service/quiz.service';
import { CategoryService } from '../../../../../service/category.service';
import { Quiz } from '../../../../../quiz';
import { Category } from '../../../../../category';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './add-quiz.html',
  styleUrls: ['./add-quiz.css']
})
export class AddQuizComponent implements OnInit {

  categories: Category[] = [];

  quizData: Quiz = {
    title: '',
    description: '',
    maxMarks: 0,
    numberOfQuestions: 0,
    active: false,
    category: undefined
  };

  constructor(
    private quizService: QuizService, // Should resolve after path fix
    private categoryService: CategoryService, // Should resolve after path fix
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories from server!', 'Dismiss', {
          duration: 3000
        });
      }
    });
  }

  addQuiz() {
    if (this.quizData.title.trim() === '' || this.quizData.description.trim() === '') {
      this.snack.open('Title and Description are required!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (this.quizData.maxMarks === undefined || this.quizData.maxMarks <= 0) {
      this.snack.open('Max Marks must be greater than 0!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (this.quizData.numberOfQuestions === undefined || this.quizData.numberOfQuestions <= 0) {
      this.snack.open('Number of Questions must be greater than 0!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (!this.quizData.category || !this.quizData.category.cid) {
      this.snack.open('Category must be selected!', 'Dismiss', { duration: 3000 });
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe({
      next: (data: any) => {
        this.snack.open('Quiz added successfully!', 'OK', {
          duration: 3000
        });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: 0,
          numberOfQuestions: 0,
          active: false,
          category: undefined
        };
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.error('Error adding quiz:', error);
        this.snack.open('Error adding quiz to server!', 'Dismiss', {
          duration: 3000
        });
      }
    });
  }
}
