// src/app/pages/user/pages/start-quiz/start-quiz.ts

import { LocationStrategy } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Added Router for potential navigation
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
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Ensure MatProgressBarModule is imported

import { QuizService } from '../../../../service/quiz.service'; // Ensure QuizService is imported
import { QuestionService } from '../../../../service/question.service';
import { Question } from '../../../../question';
import { Quiz } from '../../../../quiz';


@Component({
  selector: 'app-start-quiz',
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
    MatProgressBarModule // Keep MatProgressBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Keep if still needed for ngx-ui-loader
  templateUrl: './start-quiz.html',
  styleUrls: ['./start-quiz.css']
})
export class StartQuizComponent implements OnInit {

  qId: number = 0;
  quizTitle: string = '';
  questions: Question[] = [];
  timer: any;

  marksGot: number = 0;
  correctAnswers: number = 0;
  attempted: number = 0;

  isSubmit: boolean = false;
  currentQuestionIndex: number = 0;
  quiz: Quiz | undefined; // Holds the entire quiz object

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private quizService: QuizService, // Inject QuizService
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private ngxService: NgxUiLoaderService,
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    this.preventBackButton();

    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      const quizTitleParam = params.get('title'); // Get quiz title from route

      if (qIdParam) {
        this.qId = +qIdParam;
      } else {
        this.snack.open('Quiz ID not found in route.', 'Dismiss', { duration: 3000 });
        // Redirect to a safe page if quiz ID is not found
        this.router.navigate(['/user/load-quiz']);
        return;
      }

      if (quizTitleParam) {
        this.quizTitle = decodeURIComponent(quizTitleParam);
      } else {
        this.quizTitle = 'Unknown Quiz'; // Default if title not passed
      }

      this.loadQuizDetails(); // Load quiz details first
    });
  }

  loadQuizDetails(): void {
    this.ngxService.start();
    this.quizService.getQuiz(this.qId).subscribe({
      next: (data: Quiz) => {
        this.quiz = data; // Assign the fetched quiz data
        // Use the actual quiz title if available from the fetched data
        if (data.title) {
          this.quizTitle = data.title;
        }
        this.loadQuestions(); // Then load questions
      },
      error: (error: any) => {
        console.error('Error loading quiz details:', error);
        this.snack.open('Error loading quiz details.', 'Dismiss', { duration: 3000 });
        this.ngxService.stop();
        this.router.navigate(['/user/load-quiz']); // Redirect on error
      }
    });
  }

  loadQuestions() {
    this.questionService.getQuestionsOfQuizForUser(this.qId).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        // Calculate timer based on actual number of questions for the quiz, if available
        if (this.quiz && this.quiz.numberOfQuestions) {
          const totalTimeMinutes = this.quiz.numberOfQuestions * 2; // Example: 2 minutes per question
          this.timer = totalTimeMinutes * 60; // Convert to seconds
          this.startTimer();
        } else {
          this.timer = 0; // Set timer to 0 if no quiz data or questions
        }
        this.ngxService.stop();
        console.log('Questions for user:', this.questions);
      },
      error: (error: any) => {
        console.error('Error loading questions for user:', error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
        this.ngxService.stop();
        this.router.navigate(['/user/load-quiz']); // Redirect on error
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

        // Navigate to result page with data
        this.router.navigate([
          '/user/result',
          this.qId,
          this.marksGot,
          this.correctAnswers,
          this.attempted
        ]);
      },
      error: (error: any) => {
        console.error('Error evaluating quiz:', error);
        Swal.fire('Error', 'Error in evaluating quiz', 'error');
        this.ngxService.stop();
      }
    });
  }
}
