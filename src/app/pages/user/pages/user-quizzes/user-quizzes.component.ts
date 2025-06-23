// src/app/pages/user/pages/user-quizzes/user-quizzes.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

// Import MatListModule (already added in previous step)
import { MatListModule } from '@angular/material/list';
// FIX: Import MatChipsModule for mat-chip-listbox and mat-chip-option
import { MatChipsModule } from '@angular/material/chips';


import { QuizService } from '../../../../service/quiz.service';
import { Quiz } from '../../../../quiz';


@Component({
  selector: 'app-user-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatListModule,
    MatChipsModule // FIX: Added MatChipsModule here
  ],
  templateUrl: './user-quizzes.html',
  styleUrls: ['./user-quizzes.css']
})
export class UserQuizzesComponent implements OnInit {

  catId: number = 0;
  quizzes: Quiz[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const catIdParam = params.get('catId');
      if (catIdParam) {
        this.catId = +catIdParam;
      } else {
        this.snack.open('Category ID not found in route.', 'Dismiss', { duration: 3000 });
      }

      this.loadQuizzes();
    });
  }

  loadQuizzes(): void {
    if (this.catId === 0) {
      this.quizService.getActiveQuizzes().subscribe({
        next: (data: Quiz[]) => {
          this.quizzes = data;
          console.log('All active quizzes (User Quizzes):', this.quizzes);
        },
        error: (error: any) => {
          console.error('Error loading all active quizzes (User Quizzes):', error);
          Swal.fire('Error !!', 'Error in loading all active quizzes', 'error');
        }
      });
    } else {
      this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
        next: (data: Quiz[]) => {
          this.quizzes = data;
          console.log('Active quizzes by category (User Quizzes):', this.quizzes);
        },
        error: (error: any) => {
          console.error('Error loading active quizzes by category (User Quizzes):', error);
          Swal.fire('Error !!', 'Error in loading quizzes by category', 'error');
        }
      });
    }
  }
}
