// src/app/pages/user/result/result.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Removed RouterLink
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';
import { Quiz } from '../../../quiz';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    // RouterLink, // REMOVED: Not used directly in template for [routerLink]
    MatDividerModule
  ],
  templateUrl: './result.html',
  styleUrls: ['./result.css']
})
export class ResultComponent implements OnInit {

  qId: number = 0;
  marksGot: number = 0;
  correctAnswers: number = 0;
  attempted: number = 0;

  quiz: Quiz | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const qIdParam = params.get('qId');
      const marksGotParam = params.get('marksGot');
      const correctAnswersParam = params.get('correctAnswers');
      const attemptedParam = params.get('attempted');

      if (qIdParam) {
        this.qId = +qIdParam;
      }
      if (marksGotParam) {
        this.marksGot = +marksGotParam;
      }
      if (correctAnswersParam) {
        this.correctAnswers = +correctAnswersParam;
      }
      if (attemptedParam) {
        this.attempted = +attemptedParam;
      }

      if (this.qId) {
        this.quizService.getQuiz(this.qId).subscribe({
          next: (data: Quiz) => {
            this.quiz = data;
          },
          error: (error: any) => {
            console.error('Error fetching quiz details for result page:', error);
          }
        });
      }
    });
  }

  printPage() {
    window.print();
  }

  goToQuizzes() {
    this.router.navigate(['/user/load-quiz']);
  }
}
