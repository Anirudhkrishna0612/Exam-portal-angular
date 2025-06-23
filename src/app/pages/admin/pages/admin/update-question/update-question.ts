// src/app/pages/admin/pages/admin/update-question/update-question.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';

// Corrected import paths based on the 'service' folder now being directly under 'src/app'
import { QuestionService } from '../../../../../service/question.service';
import { QuizService } from '../../../../../service/quiz.service';
import { Question } from '../../../../../question';
import { Quiz } from '../../../../../quiz';


@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './update-question.html',
  styleUrls: ['./update-question.css']
})
export class UpdateQuestionComponent implements OnInit {

  qId: number = 0; // Quiz ID
  quizTitle: string = ''; // Quiz Title
  quesId: number = 0; // Question ID

  question: Question = new Question(); // Initialize question object

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService, // Should resolve
    private quizService: QuizService, // Should resolve
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      const quesIdParam = params.get('quesId');
      const quizTitleParam = params.get('title');

      if (qIdParam) {
        this.qId = +qIdParam;
      } else {
        this.snack.open('Quiz ID not found in route.', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/quizzes']);
        return;
      }

      if (quesIdParam) {
        this.quesId = +quesIdParam;
        this.loadQuestion();
      } else {
        this.snack.open('Question ID not found in route.', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/view-questions/' + this.qId]);
        return;
      }

      if (quizTitleParam) {
        this.quizTitle = decodeURIComponent(quizTitleParam);
      } else {
        this.quizTitle = 'Unknown Quiz';
      }

      if (!this.question.quiz) {
        this.question.quiz = new Quiz();
      }
      this.question.quiz.qid = this.qId;
    });
  }

  loadQuestion(): void {
    this.questionService.getQuestion(this.quesId).subscribe({
      next: (data: Question) => {
        this.question = data;
        console.log('Loaded Question:', this.question);

        if (this.question.quiz) {
            this.question.quiz.qid = this.qId;
            this.question.quiz.title = this.quizTitle; // Ensure title is set for display if not fully loaded
        } else {
            this.question.quiz = new Quiz();
            this.question.quiz.qid = this.qId;
            this.question.quiz.title = this.quizTitle;
            this.question.quiz.description = '';
            this.question.quiz.maxMarks = 0;
            this.question.quiz.numberOfQuestions = 0;
            this.question.quiz.active = false;
        }
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.error('Error loading question:', error);
        this.snack.open('Error loading question details!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/view-questions/' + this.qId]);
      }
    });
  }

  updateQuestionSubmit(): void {
    if (this.question.content.trim() === '') {
      this.snack.open('Question content is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (this.question.option1.trim() === '' || this.question.option2.trim() === '') {
      this.snack.open('Option 1 and Option 2 are required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (this.question.answer.trim() === '') {
      this.snack.open('Correct answer is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (!this.question.quiz) {
      this.question.quiz = new Quiz();
    }
    this.question.quiz.qid = this.qId;


    this.questionService.updateQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire('Success', 'Question updated successfully!', 'success').then((e) => {
          this.router.navigate(['/admin/view-questions', this.qId, this.quizTitle]);
        });
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.error('Error updating question:', error);
        Swal.fire('Error', 'Error updating question!', 'error');
      }
    });
  }
}
