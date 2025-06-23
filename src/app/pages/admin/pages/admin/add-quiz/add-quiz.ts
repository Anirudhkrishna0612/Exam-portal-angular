// src/app/pages/admin/pages/admin/add-quiz/add-quiz.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For NgIf, NgFor
import { FormsModule } from '@angular/forms'; // For ngModel
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; // For MatInput
import { MatFormFieldModule } from '@angular/material/form-field'; // For MatFormField
import { MatButtonModule } from '@angular/material/button'; // For MatButton
import { MatSnackBar } from '@angular/material/snack-bar'; // For MatSnackBar notifications
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../service/src/app/service/category.service'; // Adjust path based on your service location
import { QuizService } from '../../../../service/src/app/service/quiz.service'; // Adjust path
import { Router } from '@angular/router'; // For navigation
import { Category } from '../../../../../category';// <<< IMPORTANT: Updated import path and using your class


@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  templateUrl: './add-quiz.html',
  styleUrls: ['./add-quiz.css']
})
export class AddQuizComponent implements OnInit {

  quiz = {
    title: '',
    description: '',
    maxMarks: 0,
    numberOfQuestions: 0,
    active: false,
    // IMPORTANT: Initializing category using the properties from your Category class
    // and correctly setting 'cid' to null.
    category: new Category() // Initialize as an instance of your Category class
  };

  categories: Category[] = []; // Explicitly type categories array as Category[]

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Ensure the default cid is null/undefined for the dropdown to show "Select Category" initially
    this.quiz.category.cid = undefined; // Initialize with undefined for proper dropdown behavior

    // Load categories when component initializes
    this.categoryService.categories().subscribe({
      next: (data: Category[]) => { // Type the incoming data as Category[]
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.snack.open('Error loading categories from server', 'Dismiss', { duration: 3000 });
      }
    });
  }

  formSubmit() {
    if (this.quiz.title.trim() === '' || this.quiz.title === null) {
      this.snack.open('Quiz Title Required !!', 'Dismiss', { duration: 3000 });
      return;
    }
    // Check if category is selected by cid (using your Category class's property name)
    if (this.quiz.category.cid === null || this.quiz.category.cid === undefined) {
      this.snack.open('Please select a category !!', 'Dismiss', { duration: 3000 });
      return;
    }

    // Add quiz
    this.quizService.addQuiz(this.quiz).subscribe({
      next: (data: any) => {
        this.snack.open('Quiz added successfully !!', 'OK', { duration: 3000 });
        this.quiz = { // Reset form to initial state with correct types and Category instance
          title: '',
          description: '',
          maxMarks: 0,
          numberOfQuestions: 0,
          active: false,
          category: new Category() // Reset as a new Category instance
        };
        this.quiz.category.cid = undefined; // Ensure dropdown resets correctly
        this.router.navigate(['/admin/quizzes']); // Navigate back to view quizzes
      },
      error: (error: any) => {
        console.error('Error adding quiz:', error);
        this.snack.open('Something went wrong !!', 'Dismiss', { duration: 3000 });
      }
    });
  }
}
