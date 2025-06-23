// src/app/pages/user/pages/load-quiz/load-quiz.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizService } from '../../../service/src/app/service/quiz.service';
import { CategoryService } from '../../../service/src/app/service/category.service';
import { Quiz } from '../../../../quiz';
import { Category } from '../../../../category';
import { MatListModule } from '@angular/material/list'; // Added MatListModule
import { MatTableModule } from '@angular/material/table'; // Added for completeness, though not directly used in this HTML

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    RouterLink,
    MatListModule, // Include MatListModule
    MatTableModule
  ],
  templateUrl: './load-quiz.html',
  styleUrls: ['./load-quiz.css']
})
export class LoadQuizComponent implements OnInit {

  catId: number | undefined;
  quizzes: Quiz[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catId = Number(params.get('catId'));

      if (this.catId === 0) {
        this.quizService.getActiveQuizzes().subscribe({
          next: (data: Quiz[]) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          error: (error: any) => {
            console.error('Error loading all quizzes:', error);
            this.snack.open('Error loading quizzes!', 'Dismiss', { duration: 3000 });
          }
        });
      } else {
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
          next: (data: Quiz[]) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          error: (error: any) => {
            console.error('Error loading quizzes by category:', error);
            this.snack.open('Error loading quizzes!', 'Dismiss', { duration: 3000 });
          }
        });
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
}
