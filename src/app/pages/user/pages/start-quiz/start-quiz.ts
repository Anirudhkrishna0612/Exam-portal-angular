// src/app/pages/user/pages/start-quiz/start-quiz.ts

import { LocationStrategy } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA
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

import { QuestionService } from '../../../../service/question.service';
import { Quiz } from '../../../../quiz';
import { Question } from '../../../../question';


@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    NgxUiLoaderModule, // Ensure this is definitely imported here
    MatListModule,
    MatDividerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ADD THIS LINE as a temporary measure for ngx-ui-loader
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

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();

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

  loadQuestions() {
    this.ngxService.start();
    this.questionService.getQuestionsOfQuizForUser(this.qId).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        if (this.questions.length > 0 && this.questions[0].quiz?.numberOfQuestions) {
          const totalTimeMinutes = this.questions[0].quiz.numberOfQuestions * 2;
          this.timer = totalTimeMinutes * 60;
          this.startTimer();
          if (!this.quizTitle && this.questions[0].quiz?.title) {
            this.quizTitle = this.questions[0].quiz.title;
          }
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
