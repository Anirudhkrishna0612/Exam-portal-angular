// src/app/models/quiz-submission-request.ts
import { Question } from './question';

export class QuizSubmissionRequest {
  quizId?: number;
  userAnswers?: Question[];

  constructor() {
    this.quizId = undefined;
    this.userAnswers = [];
  }
}
