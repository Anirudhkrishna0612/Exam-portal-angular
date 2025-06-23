// src/app/pages/user/result/result.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// --- CORRECTED IMPORT PATHS FOR FLAT STRUCTURE ---
import { QuizResultData } from '../../../quiz-result';
import { Question } from '../../../question';
import { QuizService } from '../../service/src/app/service/quiz.service';
// --- END CORRECTED IMPORT PATHS ---

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatSnackBarModule
  ],
  templateUrl: './result.html',
  styleUrls: ['./result.css']
})
export class ResultComponent implements OnInit {

  resultData: QuizResultData | undefined;
  questions: Question[] = [];
  totalQuizMaxMarks: number = 0;

  displayedColumns: string[] = ['question', 'answer', 'givenAnswer', 'status'];

  constructor(
    private route: ActivatedRoute, // "No suitable injection token for parameter 'route'" error is often a transient issue or related to deeper structural problems. If the routes are properly configured, this should resolve with consistent imports.
    private router: Router,
    private sanitizer: DomSanitizer,
    private snack: MatSnackBar,
    private quizService: QuizService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.resultData = navigation.extras.state as QuizResultData;
      if (navigation.extras.state['questions']) {
        this.questions = navigation.extras.state['questions'];
      }

      if (this.resultData && this.resultData.totalQuestions) {
        this.totalQuizMaxMarks = this.resultData.totalQuestions * 2; // Assuming 2 marks per question as before
      }
    }
  }

  ngOnInit(): void {
    if (!this.resultData) {
      this.snack.open('Could not retrieve quiz results. Please take a quiz first.', 'Dismiss', { duration: 5000 });
      this.router.navigate(['/user/0']);
    }
  }

  goToQuizzes(): void {
    this.router.navigate(['/user/0']);
  }

  printPage(): void {
    window.print();
  }

  isAnswerCorrect(element: Question): boolean {
    return (element.answer && element.givenAnswer) ?
           element.answer.trim().toLowerCase() === element.givenAnswer.trim().toLowerCase() :
           false;
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || '');
  }

  formatGivenAnswer(givenAnswer: string | undefined): string {
    return givenAnswer && givenAnswer.trim() !== '' ? givenAnswer : 'Not Attempted';
  }
}
