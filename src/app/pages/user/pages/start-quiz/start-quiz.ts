// src/app/pages/user/pages/start-quiz/start-quiz.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizService } from '../../../service/src/app/service/quiz.service';
import { Quiz } from '../../../../quiz';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink,
    MatDialogModule
  ],
  templateUrl: './start-quiz.html',
  styleUrls: ['./start-quiz.css']
})
export class StartQuizComponent implements OnInit {

  qId: number | undefined;
  quiz: Quiz | undefined;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private snack: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.qId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.loadQuiz();
  }

  loadQuiz(): void {
    if (this.qId) {
      this.quizService.getQuiz(this.qId).subscribe({
        next: (data: Quiz) => {
          this.quiz = data;
          console.log('Quiz loaded for start quiz:', this.quiz);
        },
        error: (error: any) => {
          console.error('Error loading quiz:', error);
          this.snack.open('Error loading quiz details!', 'Dismiss', { duration: 3000 });
          this.router.navigate(['/user/0']);
        }
      });
    } else {
      this.snack.open('Quiz ID is missing!', 'Dismiss', { duration: 3000 });
      this.router.navigate(['/user/0']);
    }
  }

  startQuiz(): void {
    if (!this.qId) {
      this.snack.open('Cannot start quiz: Quiz ID is missing!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (confirm('Are you sure you want to start this quiz?')) {
      this.router.navigate(['/user/take-quiz', this.qId]);
    }
  }
}
