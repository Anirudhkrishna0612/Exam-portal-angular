// src/app/pages/admin/pages/admin/update-question/update-question.ts

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
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { QuestionService } from '../../../../service/src/app/service/question.service';
import { Question } from '../../../../../question';
import { Quiz } from '../../../../../quiz';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; // For CKEditor component
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-update-question',
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
    CKEditorModule, // Import CKEditorModule
    MatDividerModule, // Import MatDividerModule
    RouterLink // For routerLink
  ],
  templateUrl: './update-question.html',
  styleUrls: ['./update-question.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId: number | undefined;
  qId: number | undefined; // Declare qId
  qTitle: string = ''; // Declare qTitle for template
  question: Question = new Question();
  quiz: Quiz = new Quiz(); // To hold quiz data if needed

  public Editor: any = ClassicEditor; // CRITICAL FIX: Explicitly type Editor as 'any' for CKEditor type compatibility
  editorConfig = {
    placeholder: 'Enter question content here',
    // Add other CKEditor configurations if needed
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
    this.quesId = Number(this.route.snapshot.paramMap.get('quesId'));
    this.qId = Number(this.route.snapshot.paramMap.get('qId'));
    this.qTitle = this.route.snapshot.paramMap.get('title') || '';

    this.questionService.getQuestion(this.quesId).subscribe({
      next: (data: Question) => {
        this.question = data;
        console.log('Question loaded for update:', this.question);
      },
      error: (error: any) => {
        console.error('Error loading question for update:', error);
        this.snack.open('Error loading question!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/admin/view-questions', this.qId, this.qTitle]);
      }
    });

    if (this.qId) {
      this.quizService.getQuiz(this.qId).subscribe({
        next: (data: Quiz) => {
          this.quiz = data;
        },
        error: (error: any) => {
          console.error('Error loading quiz details:', error);
        }
      });
    }
  }

  formSubmit(): void {
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

    if (!this.question.quiz && this.quiz.qid) {
      this.question.quiz = this.quiz;
    }

    this.questionService.updateQuestion(this.question).subscribe({
      next: (data: Question) => {
        this.snack.open('Question updated successfully!', 'OK', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['success-snackbar']
        });
        this.router.navigate(['/admin/view-questions', this.qId, this.qTitle]);
      },
      error: (error: any) => {
        console.error('Error updating question:', error);
        this.snack.open('Error updating question! Server error.', 'Dismiss', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'right', panelClass: ['error-snackbar']
        });
      }
    });
  }
}
