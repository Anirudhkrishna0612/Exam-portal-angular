// src/app/pages/admin/pages/admin/quizzes/quizzes.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

// FIX: Import MatListModule and MatSlideToggleModule
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { QuizService } from '../../../../../service/quiz.service';
import { Quiz } from '../../../../../quiz';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatListModule, // ADDED
    MatSlideToggleModule // ADDED
  ],
  templateUrl: './quizzes.html',
  styleUrls: ['./quizzes.css']
})
export class QuizzesComponent implements OnInit {

  quizzes: Quiz[] = [];
  displayedColumns: string[] = ['qid', 'title', 'description', 'maxMarks', 'numberOfQuestions', 'active', 'category', 'actions'];

  constructor(private quizService: QuizService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe({
      next: (data: Quiz[]) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      error: (error: any) => {
        console.error('Error loading quizzes:', error);
        Swal.fire('Error !!', 'Error in loading quizzes', 'error');
      }
    });
  }

  deleteQuiz(qid: number | undefined) { // FIX: Allow qid to be undefined here
    if (qid === undefined) { // Ensure qid is not undefined before proceeding
      this.snack.open('Error: Quiz ID is missing for deletion.', 'Dismiss', { duration: 3000 });
      return;
    }
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(qid).subscribe({
          next: (data: any) => {
            this.snack.open('Quiz Deleted Successfully', 'Ok', {
              duration: 3000,
            });
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid !== qid);
          },
          error: (error: any) => {
            this.snack.open('Error in deleting quiz', 'Ok', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  updateQuizStatus(quiz: Quiz) {
    const newStatus = !quiz.active;
    Swal.fire({
      title: `Confirm change status to ${newStatus ? 'active' : 'inactive'} for "${quiz.title}"?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedQuizData = { ...quiz, active: newStatus };
        this.quizService.updateQuiz(updatedQuizData).subscribe({
          next: (response: Quiz) => {
            quiz.active = response.active;
            this.snack.open(`Quiz "${quiz.title}" is now ${newStatus ? 'active' : 'inactive'}`, 'Dismiss', { duration: 3000 });
          },
          error: (error: any) => {
            console.error('Error updating quiz status:', error);
            this.snack.open('Failed to update quiz status.', 'Dismiss', { duration: 3000 });
          }
        });
      }
    });
  }
}
