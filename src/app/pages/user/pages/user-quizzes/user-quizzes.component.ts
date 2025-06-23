// src/app/pages/user/user-dashboard/user-quizzes/user-quizzes.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../service/src/app/service/quiz.service';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink, ParamMap } from '@angular/router'; // IMPORTANT: Import ParamMap


@Component({
  selector: 'app-user-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    RouterLink
  ],
  templateUrl: './user-quizzes.html',
  styleUrls: ['./user-quizzes.css']
})
export class UserQuizzesComponent implements OnInit {

  quizzes: any[] = [];
  cid: number | null = null;

  constructor(
    private quizService: QuizService,
    private snack: MatSnackBar,
    private route: ActivatedRoute // Injected ActivatedRoute
  ) { }

  ngOnInit(): void {
    // FIX 1: Explicitly type 'params' as ParamMap
    // FIX 2: Ensure categoryId is converted to a number using the '+' unary operator
    this.route.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('cid');
      if (categoryId) {
        this.cid = +categoryId; // Use unary '+' operator to convert string to number
        this.loadQuizzesByCategory(this.cid);
      } else {
        this.loadActiveQuizzes();
      }
    });
  }

  loadActiveQuizzes() {
    this.quizService.getActiveQuizzes().subscribe({
      next: (data: any[]) => {
        this.quizzes = data;
        console.log('User Quizzes loaded:', this.quizzes);
        if (this.quizzes.length === 0) {
          this.snack.open('No active quizzes found.', 'Dismiss', { duration: 3000 });
        }
      },
      error: (error: any) => {
        console.error('Error loading quizzes for user:', error);
        this.snack.open('Error loading quizzes from server.', 'Dismiss', { duration: 3000 });
      }
    });
  }

  loadQuizzesByCategory(cid: number) {
    this.quizService.getActiveQuizzesOfCategory(cid).subscribe({
      next: (data: any[]) => {
        this.quizzes = data;
        console.log(`User Quizzes for category ${cid} loaded:`, this.quizzes);
        if (this.quizzes.length === 0) {
          this.snack.open(`No active quizzes found for this category.`, 'Dismiss', { duration: 3000 });
        }
      },
      error: (error: any) => {
        console.error(`Error loading quizzes for category ${cid}:`, error);
        this.snack.open('Error loading quizzes for this category from server.', 'Dismiss', { duration: 3000 });
      }
    });
  }
}
