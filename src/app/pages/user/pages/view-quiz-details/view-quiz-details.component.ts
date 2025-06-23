// src/app/pages/user/pages/view-quiz-details/view-quiz-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // FIX: Import RouterModule
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-quiz-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule // FIX: Add RouterModule here
  ],
  templateUrl: './view-quiz-details.component.html',
  styleUrls: ['./view-quiz-details.component.css']
})
export class ViewQuizDetailsComponent implements OnInit {
  quizId: string | null = null;
  quizTitle: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quizId = params.get('qId');
      this.quizTitle = params.get('title');
    });
  }
}
