// src/app/pages/admin/pages/admin/quizzes/quizzes.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For NgIf, NgFor
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'; // For MatTable
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../../service/src/app/service/quiz.service'; // Adjust path
import { RouterLink } from '@angular/router'; // For routerLink in HTML
import { MatChipsModule } from '@angular/material/chips'; // IMPORTANT: This was missing in imports


@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule, // Add to imports
    MatChipsModule, // ADDED: Required for mat-chip-listbox and mat-chip-option
    RouterLink // Add to imports if using routerLink
  ],
  templateUrl: './quizzes.html',
  styleUrls: ['./quizzes.css']
})
export class QuizzesComponent implements OnInit {

  quizzes: any = []; // Initialize as an empty array

  displayedColumns: string[] = ['qId', 'title', 'description', 'maxMarks', 'numberOfQuestions', 'category', 'active', 'actions'];

  constructor(private quizService: QuizService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log('Quizzes loaded:', this.quizzes);
      },
      error: (error: any) => {
        console.error('Error loading quizzes:', error);
        this.snack.open('Error loading quizzes from server', 'Dismiss', { duration: 3000 });
      }
    });
  }

  deleteQuiz(qId: any) {
    if (confirm('Are you sure you want to delete this quiz?')) { // Using confirm as requested
      this.quizService.deleteQuiz(qId).subscribe({
        next: (data: any) => {
          this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId !== qId);
          this.snack.open('Quiz deleted successfully !!', 'OK', { duration: 3000 });
        },
        error: (error: any) => {
          console.error('Error deleting quiz:', error);
          this.snack.open('Error deleting quiz !!', 'Dismiss', { duration: 3000 });
        }
      });
    }
  }

}
