// src/app/pages/user/pages/user/take-quiz/take-quiz.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../../service/src/app/service/quiz.service';
import { QuestionService } from '../../../../service/src/app/service/question.service';
import { Quiz } from '../../../../../quiz';
import { Question } from '../../../../../question';
import { QuizSubmissionRequest } from '../../../../../quiz-submission-request';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './take-quiz.html',
  styleUrls: ['./take-quiz.css']
})
export class TakeQuizComponent implements OnInit, OnDestroy {

  qId: number | undefined;
  questions: Question[] = [];
  quiz: Quiz | undefined;
  timer: any;
  minutes: number = 0;
  seconds: number = 0;
  currentQuestionIndex: number = 0; // **CRITICAL FIX: Added for progress tracking**

  isSubmit: boolean = false;

  // Result variables
  marksGot: number = 0;
  correctAnswers: number = 0;
  attempted: number = 0;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.qId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  loadQuestions(): void {
    this.quizService.getQuiz(this.qId!).subscribe({
      next: (quizData: Quiz) => {
        this.quiz = quizData;
        console.log('Quiz loaded for take-quiz:', this.quiz);

        this.questionService.getQuestionsOfQuizForUser(this.qId!).subscribe({
          next: (questionsData: Question[]) => {
            this.questions = questionsData;
            console.log('Questions for user loaded:', this.questions);

            this.questions.forEach(q => {
              q.givenAnswer = '';
            });

            this.minutes = Number(this.quiz?.numberOfQuestions) * 2;
            this.seconds = 0;
            this.startTimer();

          },
          error: (error) => {
            console.error('Error loading questions for user:', error);
            this.snack.open('Error loading questions for quiz!', 'Dismiss', { duration: 3000 });
          }
        });
      },
      error: (error) => {
        console.error('Error loading quiz details in take-quiz:', error);
        this.snack.open('Error loading quiz details!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/user/0']);
      }
    });
  }

  startTimer(): void {
    let t = window.setInterval(() => {
      if (this.seconds <= 0) {
        if (this.minutes <= 0) {
          this.submitQuiz(); // Auto-submit when time runs out
          clearInterval(t);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
    this.timer = t;
  }

  formatTime(): string {
    let min = this.minutes < 10 ? '0' + this.minutes : this.minutes.toString();
    let sec = this.seconds < 10 ? '0' + this.seconds : this.seconds.toString();
    return `${min}:${sec}`;
  }

  submitQuiz(): void {
    if (this.isSubmit) {
      return;
    }

    if (confirm('Are you sure you want to submit the quiz?')) {
      this.isSubmit = true;
      clearInterval(this.timer);

      const submissionRequest: QuizSubmissionRequest = {
        quizId: this.qId,
        userAnswers: this.questions
      };

      this.questionService.evalQuiz(submissionRequest).subscribe({
        next: (data: any) => {
          console.log('Quiz Evaluation Result:', data);
          this.marksGot = parseFloat(data.marksGot);
          this.correctAnswers = data.correctAnswers;
          this.attempted = data.attempted;

          this.router.navigate(['/user/result'], {
            state: {
              marksGot: this.marksGot,
              correctAnswers: this.correctAnswers,
              attempted: this.attempted,
              totalQuestions: this.questions.length,
              quizTitle: this.quiz?.title
            }
          });
        },
        error: (error) => {
          console.error('Error evaluating quiz:', error);
          this.snack.open('Error evaluating quiz. Server Error!', 'Dismiss', { duration: 3000 });
          this.isSubmit = false;
        }
      });
    }
  }
}
