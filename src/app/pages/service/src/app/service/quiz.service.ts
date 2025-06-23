// src/app/service/quiz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../../../../../quiz';
import { BASE_URL } from '../../../../../app.constants';
import { Category } from '../../../../../category';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = `${BASE_URL}/quiz`;

  constructor(private http: HttpClient) { }

  public quizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/`);
  }

  public getActiveQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/active`);
  }

  public addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/`, quiz);
  }

  public deleteQuiz(qid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${qid}`);
  }

  public getQuiz(qid: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${qid}`);
  }

  public updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/`, quiz);
  }

  public getQuizzesOfCategory(cid: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/category/${cid}`);
  }

  public getActiveQuizzesOfCategory(cid: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/category/active/${cid}`);
  }
}
