// src/app/service/quiz.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../quiz'; // Adjust path as needed
import { BASE_URL } from '../app.constants'; // Assuming you have a helper for base URL

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  // Method to add a new quiz
  public addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${BASE_URL}/quiz/`, quiz);
  }

  // Method to update an existing quiz
  public updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${BASE_URL}/quiz/`, quiz);
  }

  // Method to get all quizzes (for admin panel)
  // FIX: Added getQuizzes method
  public getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${BASE_URL}/quiz/`);
  }

  // Method to get a single quiz by ID
  public getQuiz(qid: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${BASE_URL}/quiz/${qid}`);
  }

  // Method to delete a quiz by ID
  public deleteQuiz(qid: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/quiz/${qid}`);
  }

  // Method to get quizzes of a specific category
  public getQuizzesOfCategory(cid: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${BASE_URL}/quiz/category/${cid}`);
  }

  // Method to get active quizzes for users
  public getActiveQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${BASE_URL}/quiz/active`);
  }

  // Method to get active quizzes of a specific category for users
  public getActiveQuizzesOfCategory(cid: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${BASE_URL}/quiz/category/active/${cid}`);
  }
}
