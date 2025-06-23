// src/app/service/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../../../../question';
import { BASE_URL } from '../../../../../app.constants';
import { QuizSubmissionRequest } from '../../../../../quiz-submission-request';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = `${BASE_URL}/question`;
  private quizAttemptUrl = `${BASE_URL}/quiz-attempt`;

  constructor(private http: HttpClient) { }

  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/`, question);
  }

  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/`, question);
  }

  public getQuestionsOfQuiz(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/quiz/${quizId}`);
  }

  public getQuestionsOfQuizForUser(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/quiz/active/${quizId}`);
  }

  public getQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${questionId}`);
  }

  public deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${questionId}`);
  }

  public evalQuiz(submissionRequest: QuizSubmissionRequest): Observable<any> {
    return this.http.post<any>(`${this.quizAttemptUrl}/submit`, submissionRequest);
  }
}
