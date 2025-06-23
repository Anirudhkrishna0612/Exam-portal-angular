// src/app/pages/user/pages/load-quiz/load-quiz.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

// Corrected import paths
import { QuizService } from '../../../../service/quiz.service'; // Corrected path
import { CategoryService } from '../../../../service/category.service'; // Corrected path
import { Quiz } from '../../../../quiz';
import { Category } from '../../../../category';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './load-quiz.html',
  styleUrls: ['./load-quiz.css']
})
export class LoadQuizComponent implements OnInit {

  catId: number = 0;
  quizzes: Quiz[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService, // Should resolve
    private categoryService: CategoryService, // Should resolve
    private snack: MatSnackBar,
    private router: Router
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
          console.log('All active quizzes:', this.quizzes);
        },
        error: (error: any) => { // TS7006 fix: added : any
          console.error('Error loading all active quizzes:', error);
          Swal.fire('Error !!', 'Error in loading all active quizzes', 'error');
        }
      });
    } else {
      this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
        next: (data: Quiz[]) => {
          this.quizzes = data;
          console.log('Active quizzes by category:', this.quizzes);
        },
        error: (error: any) => { // TS7006 fix: added : any
          console.error('Error loading active quizzes by category:', error);
          Swal.fire('Error !!', 'Error in loading quizzes by category', 'error');
        }
      });
    }
  }
}
