// src/app/pages/admin/pages/admin/quizzes/quizzes.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Quiz } from '../../../../../quiz';
import { MatTableModule } from '@angular/material/table'; // Added MatTableModule
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Added MatSlideToggleModule

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink,
    MatTableModule, // Include MatTableModule
    MatSlideToggleModule // Include MatSlideToggleModule
  ],
  templateUrl: './quizzes.html',
  styleUrls: ['./quizzes.css']
})
export class QuizzesComponent implements OnInit {

  quizzes: Quiz[] = [];
  displayedColumns: string[] = ['qid', 'title', 'description', 'maxMarks', 'numberOfQuestions', 'active', 'category', 'action'];

  constructor(private quizService: QuizService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.quizService.quizzes().subscribe({
      next: (data: Quiz[]) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      error: (error: any) => {
        console.error('Error loading quizzes:', error);
        this.snack.open('Error loading quizzes from server!', 'Dismiss', { duration: 3000 });
      }
    });
  }

  deleteQuiz(qid: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(qid).subscribe({
        next: (data) => {
          this.snack.open('Quiz deleted successfully!', 'OK', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
          });
          this.quizzes = this.quizzes.filter(quiz => quiz.qid !== qid);
        },
        error: (error: any) => {
          console.error('Error deleting quiz:', error);
          this.snack.open('Error deleting quiz!', 'Dismiss', {
            duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
