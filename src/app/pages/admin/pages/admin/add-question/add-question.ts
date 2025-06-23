// src/app/pages/admin/pages/admin/add-question/add-question.ts

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
import { MatDividerModule } from '@angular/material/divider'; // Ensure MatDividerModule is imported

// Corrected import paths based on the 'service' folder now being directly under 'src/app'
import { QuestionService } from '../../../../../service/question.service';
import { QuizService } from '../../../../../service/quiz.service';
import { Question } from '../../../../../question';
import { Quiz } from '../../../../../quiz';


@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule // Add MatDividerModule if you use <mat-divider>
  ],
  templateUrl: './add-question.html',
  styleUrls: ['./add-question.css']
})
export class AddQuestionComponent implements OnInit {

  qId: number = 0;
  quizTitle: string = '';

  question: Question = new Question(); // Initialize with constructor

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService, // Should resolve after path fix
    private quizService: QuizService, // Should resolve after path fix
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      if (qIdParam) {
        this.qId = +qIdParam;
      } else {
        this.qId = 0;
        this.snack.open('Quiz ID not found in route.', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/quizzes']); // Redirect if ID is missing
        return;
      }

      const quizTitleParam = params.get('title');
      if (quizTitleParam) {
        this.quizTitle = decodeURIComponent(quizTitleParam); // Decode URL encoded title
      } else {
        this.quizTitle = 'Unknown Quiz';
      }

      // Ensure the question's quiz object is properly initialized with qid
      if (!this.question.quiz) {
          this.question.quiz = new Quiz(); // Create a new Quiz instance if null/undefined
      }
      this.question.quiz.qid = this.qId; // Assign the qid received from the route

      // Optional: Load full quiz details if needed for other properties of question.quiz
      if (this.qId > 0) {
        this.quizService.getQuiz(this.qId).subscribe({
          next: (quizData: Quiz) => {
            this.question.quiz = quizData; // Assign the entire fetched quiz data
            // Re-confirm qid after full quiz data load, just to be safe
            if (this.question.quiz) {
              this.question.quiz.qid = this.qId;
            }
            console.log('Full quiz details loaded for question association:', this.question.quiz);
          },
          error: (error: any) => { // TS7006 fix: added : any
            console.error('Error loading quiz details for question:', error);
            this.snack.open('Error loading associated quiz details for displaying title.', 'Dismiss', { duration: 3000 });
          }
        });
      } else {
        this.snack.open('Cannot load quiz details: Invalid Quiz ID from route.', 'Dismiss', { duration: 3000 });
      }
    });
  }

  formSubmit() {
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

    // CRITICAL: Re-confirm the quiz ID just before sending the data
    if (!this.question.quiz) {
        this.question.quiz = new Quiz();
    }
    this.question.quiz.qid = this.qId;

    console.log('Question object being sent to backend:', this.question);

    this.questionService.addQuestion(this.question).subscribe({
      next: (data: any) => {
        this.snack.open('Question added successfully! Add more questions.', 'OK', { duration: 3000 });
        // Reset the form for adding another question
        this.question = new Question(); // Use constructor for reset
        // Preserve the quiz ID for the next question on the same page
        if (this.question.quiz) {
          this.question.quiz.qid = this.qId;
        } else {
          this.question.quiz = new Quiz();
          this.question.quiz.qid = this.qId;
        }
      },
      error: (error: any) => { // TS7006 fix: added : any
        console.error('Error adding question:', error);
        this.snack.open('Error adding question to server!', 'Dismiss', { duration: 3000 });
      }
    });
  }
}
