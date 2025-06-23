// src/app/service/question.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../question';
import { BASE_URL } from '../app.constants'; // Path to BASE_URL helper (adjust if different)

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // Add a new question
  public addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${BASE_URL}/question/`, question);
  }

  // Update an existing question
  public updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${BASE_URL}/question/`, question);
  }

  // Get all questions (primarily for admin)
  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${BASE_URL}/question/`);
  }

  // Get a single question by ID
  public getQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(`${BASE_URL}/question/${questionId}`);
  }

  // Get questions for a specific quiz (for admin to manage)
  public getQuestionsOfQuiz(qid: number): Observable<Question[]> { // Takes qid, not Quiz object
    return this.http.get<Question[]>(`${BASE_URL}/question/quiz/${qid}`);
  }

  // Get a limited number of questions for a specific quiz (for user to take quiz)
  public getQuestionsOfQuizForUser(qid: number): Observable<Question[]> {
    // Backend endpoint is /question/quiz/active/{quizId}
    return this.http.get<Question[]>(`${BASE_URL}/question/quiz/active/${qid}`);
  }

  // Delete a question by ID
  public deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/question/${questionId}`);
  }

  // Evaluate Quiz endpoint for users
  public evalQuiz(questions: Question[]): Observable<any> {
    return this.http.post(`${BASE_URL}/question/eval-quiz`, questions);
  }
}
