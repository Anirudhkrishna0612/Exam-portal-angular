// src/app/pages/admin/pages/admin/view-quiz-questions/view-quiz-questions.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Ensure MatCardModule is imported
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

// Removed MatTableModule, MatListModule, MatDividerModule as we are using cards for display
// If MatRadioModule is not explicitly used in this component's template, it can also be removed.

import { QuestionService } from '../../../../../service/question.service';
import { Question } from '../../../../../question';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, // Keep MatCardModule
    MatIconModule,
    MatButtonModule,
    RouterLink,
    // Removed: MatTableModule, MatListModule, MatDividerModule, MatRadioModule
  ],
  templateUrl: './view-quiz-questions.html',
  styleUrls: ['./view-quiz-questions.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: number = 0;
  quizTitle: string = '';
  questions: Question[] = [];
  // No longer using displayedColumns for mat-table, but kept as a reminder if needed later
  // displayedColumns: string[] = ['quesId', 'content', 'option1', 'option2', 'option3', 'option4', 'answer', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      const quizTitleParam = params.get('title');

      if (qIdParam) {
        this.qId = +qIdParam;
      } else {
        this.snack.open('Quiz ID not found in route.', 'Dismiss', { duration: 3000 });
        return;
      }

      if (quizTitleParam) {
        this.quizTitle = decodeURIComponent(quizTitleParam);
      } else {
        this.quizTitle = 'Unknown Quiz';
      }

      this.loadQuestions();
    });
  }

  loadQuestions(): void {
    this.questionService.getQuestionsOfQuiz(this.qId).subscribe({
      next: (data: Question[]) => {
        console.log('Questions for Quiz (Admin View):', data);
        this.questions = data;
      },
      error: (error: any) => {
        console.error('Error loading questions:', error);
        Swal.fire('Error', 'Error in loading questions', 'error');
      }
    });
  }

  deleteQuestion(quesId: number | undefined): void {
    if (quesId === undefined) {
      this.snack.open('Error: Question ID is missing for deletion.', 'Dismiss', { duration: 3000 });
      return;
    }
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(quesId).subscribe({
          next: (data: any) => {
            this.snack.open('Question Deleted Successfully', 'Ok', {
              duration: 3000,
            });
            this.questions = this.questions.filter((question) => question.quesId !== quesId);
          },
          error: (error: any) => {
            this.snack.open('Error in deleting question', 'Ok', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
