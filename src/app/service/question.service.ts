// src/app/service/question.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../question'; // Assuming this path for Question model
import { BASE_URL } from '../app.constants'; // Assuming BASE_URL is in helper.ts

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/question/`, question);
  }

  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/question/`, question);
  }

  public getQuestionsOfQuiz(qId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/question/quiz/${qId}`);
  }

  public getQuestionsOfQuizForUser(qId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/question/quiz/active/${qId}`);
  }

  public getQuestion(quesId: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/question/${quesId}`);
  }

  public deleteQuestion(quesId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/question/${quesId}`);
  }

  // FIX: Updated evalQuiz to accept quizId and send it as a path variable
  public evalQuiz(quizId: number, questions: Question[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/question/eval-quiz/${quizId}`, questions);
  }
}
