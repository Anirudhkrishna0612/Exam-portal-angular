// src/app/models/quiz-result.ts

export interface QuizResultData {
  marksGot: number;
  correctAnswers: number;
  attempted: number;
  totalQuestions: number;
  quizTitle?: string;
}
