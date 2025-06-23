// src/app/pages/user/pages/user/take-quiz/take-quiz.ts

import { LocationStrategy } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
// FIX: Import MatProgressBarModule
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { QuizService } from '../../../../../service/quiz.service';
import { QuestionService } from '../../../../../service/question.service';
import { Question } from '../../../../../question';
import { Quiz } from '../../../../../quiz';


@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    NgxUiLoaderModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule // ADDED
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Keep if still needed for ngx-ui-loader
  templateUrl: './take-quiz.html',
  styleUrls: ['./take-quiz.css']
})
export class TakeQuizComponent implements OnInit {

  qId: number = 0;
  quizTitle: string = '';
  questions: Question[] = [];
  timer: any;

  marksGot: number = 0;
  correctAnswers: number = 0;
  attempted: number = 0;

  isSubmit: boolean = false;
  // FIX: Add currentQuestionIndex property
  currentQuestionIndex: number = 0;
  // FIX: Add quiz property to hold the full quiz object
  quiz: Quiz | undefined;


  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private quizService: QuizService, // To fetch quiz details
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();

    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      if (qIdParam) {
        this.qId = +qIdParam;
        this.loadQuizDetails(); // Load quiz details first
      } else {
        this.snack.open('Quiz ID not found in route.', 'Dismiss', { duration: 3000 });
        return;
      }
    });
  }

  loadQuizDetails(): void {
    this.quizService.getQuiz(this.qId).subscribe({
      next: (data: Quiz) => {
        this.quiz = data;
        this.quizTitle = data.title || 'Unknown Quiz'; // Set quizTitle from loaded quiz
        this.loadQuestions(); // Load questions after quiz details are loaded
      },
      error: (error: any) => {
        console.error('Error loading quiz details:', error);
        this.snack.open('Error loading quiz details for quiz.', 'Dismiss', { duration: 3000 });
      }
    });
  }

  loadQuestions() {
    this.ngxService.start();
    this.questionService.getQuestionsOfQuizForUser(this.qId).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        if (this.questions.length > 0 && this.quiz?.numberOfQuestions) { // Use this.quiz for numberOfQuestions
          const totalTimeMinutes = this.quiz.numberOfQuestions * 2; // Use this.quiz.numberOfQuestions
          this.timer = totalTimeMinutes * 60;
          this.startTimer();
        } else {
          this.timer = 0;
        }
        this.ngxService.stop();
        console.log('Questions for user:', this.questions);
      },
      error: (error: any) => {
        console.error('Error loading questions for user:', error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
        this.ngxService.stop();
      }
    });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  // FIX: Rename to getFormattedTime to match HTML
  getFormattedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer - minutes * 60;
    return `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`;
  }

  evalQuiz() {
    this.ngxService.start();
    this.questionService.evalQuiz(this.questions).subscribe({
      next: (data: any) => {
        console.log('Quiz Evaluation Results:', data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
        this.ngxService.stop();
      },
      error: (error: any) => {
        console.error('Error evaluating quiz:', error);
        Swal.fire('Error', 'Error in evaluating quiz', 'error');
        this.ngxService.stop();
      }
    });
  }
}
