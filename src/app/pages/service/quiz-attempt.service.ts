// src/app/pages/service/quiz-attempt.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 


interface QuizSubmissionRequest {
  quizId: number;
  userAnswers: { questionId: number; selectedOption: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizAttemptService {

  private baseUrl = environment.apiUrl; // Base URL from environment (e.g., http://localhost:8060)

  constructor(private http: HttpClient) { }

  /**
   * Submits a user's quiz answers for grading.
   * @param submissionRequest DTO containing quiz ID and user answers.
   * @returns Observable of the QuizResult from the backend.
   */
  public submitQuiz(submissionRequest: QuizSubmissionRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quiz-attempt/submit`, submissionRequest);
  }

  /**
   * Retrieves a specific quiz result for the logged-in user.
   * @param quizId The ID of the quiz.
   * @returns Observable of the QuizResult.
   */
  public getQuizResult(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/quiz-attempt/result/${quizId}`);
  }

  /**
   * Retrieves all quiz results for the logged-in user.
   * @returns Observable of an array of QuizResult objects.
   */
  public getAllQuizResultsByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/quiz-attempt/user-results`);
  }
}
