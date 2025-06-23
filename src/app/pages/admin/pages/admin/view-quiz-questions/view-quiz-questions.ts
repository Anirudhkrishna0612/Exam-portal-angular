// src/app/pages/admin/pages/admin/view-quiz-questions/view-quiz-questions.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { QuestionService } from '../../../../service/src/app/service/question.service';
import { Quiz } from '../../../../../quiz';
import { Question } from '../../../../../question';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './view-quiz-questions.html',
  styleUrls: ['./view-quiz-questions.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId: string = '';
  quizTitle: string = ''; // Keep as string
  questions: Question[] = [];
  newQuestion: Question = new Question();

  displayedColumns: string[] = ['id', 'content', 'options', 'answer', 'action'];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this.loadQuizDetails();
    this.loadQuestions();
  }

  loadQuizDetails(): void {
    this.quizService.getQuiz(Number(this.quizId)).subscribe({
      next: (data: Quiz) => {
        // CRITICAL FIX: Use nullish coalescing operator to assign a default empty string if data.title is undefined
        this.quizTitle = data.title ?? '';
      },
      error: (error) => {
        console.error('Error loading quiz details:', error);
        this.snack.open('Error loading quiz details.', 'Dismiss', { duration: 3000 });
      }
    });
  }

  loadQuestions(): void {
    this.questionService.getQuestionsOfQuiz(Number(this.quizId)).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        console.log('Questions loaded:', this.questions);
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.snack.open('Error loading questions.', 'Dismiss', { duration: 3000 });
      }
    });
  }

  addQuestion(): void {
    if (!this.newQuestion.content || !this.newQuestion.option1 || !this.newQuestion.option2 || !this.newQuestion.answer) {
      this.snack.open('Question content, Option 1, Option 2, and Answer are required!', 'Dismiss', { duration: 5000 });
      return;
    }

    const quizForQuestion = new Quiz();
    quizForQuestion.qid = Number(this.quizId);
    this.newQuestion.quiz = quizForQuestion;

    this.questionService.addQuestion(this.newQuestion).subscribe({
      next: (data: Question) => {
        this.snack.open('Question added successfully!', 'OK', { duration: 3000 });
        this.questions.push(data);
        this.newQuestion = new Question();
        this.loadQuestions();
      },
      error: (error) => {
        console.error('Error adding question:', error);
        this.snack.open('Error adding question.', 'Dismiss', { duration: 3000 });
      }
    });
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(questionId).subscribe({
        next: () => {
          this.snack.open('Question deleted successfully!', 'OK', { duration: 3000 });
          this.questions = this.questions.filter(q => q.quesId !== questionId);
        },
        error: (error) => {
          console.error('Error deleting question:', error);
          this.snack.open('Error deleting question.', 'Dismiss', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.newQuestion = new Question();
  }
}
