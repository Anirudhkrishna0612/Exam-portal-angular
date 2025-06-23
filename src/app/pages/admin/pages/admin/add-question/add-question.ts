// src/app/pages/admin/pages/admin/add-question/add-question.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// --- CORRECTED IMPORT PATHS FOR FLAT STRUCTURE ---
import { QuestionService } from '../../../../service/src/app/service/question.service';
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { Question } from '../../../../../question';
import { Quiz } from '../../../../../quiz';
// --- END CORRECTED IMPORT PATHS ---
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; // CRITICAL: Import CKEditorModule
import { MatDividerModule } from '@angular/material/divider'; // CRITICAL: Import MatDividerModule

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    CKEditorModule, // Include CKEditorModule
    MatDividerModule, // Include MatDividerModule
    RouterLink
  ],
  templateUrl: './add-question.html',
  styleUrls: ['./add-question.css']
})
export class AddQuestionComponent implements OnInit {

  qId: number | undefined;
  qTitle: string = ''; // Property 'qTitle' declared for HTML access
  question: Question = new Question();
  quiz: Quiz = new Quiz();

  public Editor: any = ClassicEditor; // CRITICAL: Property 'Editor' declared for HTML access
  editorConfig = { // CRITICAL: Property 'editorConfig' declared for HTML access
    placeholder: 'Enter question content here',
    toolbar: {
      items: [
        'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
        'insertTable', 'undo', 'redo'
      ]
    },
    language: 'en'
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.qId = Number(this.route.snapshot.paramMap.get('qId'));
    this.qTitle = this.route.snapshot.paramMap.get('title') || '';

    if (this.qId) {
      this.quizService.getQuiz(this.qId).subscribe({
        next: (data: Quiz) => {
          this.quiz = data;
          this.question.quiz = this.quiz;
          console.log('Quiz loaded for adding question:', this.quiz);
        },
        error: (error: any) => {
          console.error('Error loading quiz details:', error);
          this.snack.open('Error loading quiz details!', 'Dismiss', { duration: 3000 });
          this.router.navigate(['/admin/quizzes']);
        }
      });
    }
  }

  formSubmit(): void { // Method 'formSubmit' declared for HTML access
    if (!this.question.content || this.question.content.trim() === '') {
      this.snack.open('Question content is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.question.option1 || this.question.option1.trim() === '') {
      this.snack.open('Option 1 is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.question.option2 || this.question.option2.trim() === '') {
      this.snack.open('Option 2 is required!', 'Dismiss', { duration: 3000 });
      return;
    }
    if (!this.question.answer || this.question.answer.trim() === '') {
      this.snack.open('Answer is required!', 'Dismiss', { duration: 3000 });
      return;
    }

    if (!this.question.quiz || this.question.quiz.qid === undefined) {
      this.snack.open('Quiz association failed! Please reload.', 'Dismiss', { duration: 3000 });
      return;
    }

    this.questionService.addQuestion(this.question).subscribe({
      next: (data: Question) => {
        this.snack.open('Question added successfully!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        this.question = new Question();
        this.question.quiz = this.quiz;
      },
      error: (error: any) => {
        console.error('Error adding question:', error);
        this.snack.open('Error adding question! Server error.', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
