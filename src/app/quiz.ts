// src/app/models/quiz.ts
import { Category } from './category';
import { Question } from './question';

export class Quiz {
  qid?: number;
  title?: string;
  description?: string;
  maxMarks?: number;
  numberOfQuestions?: number;
  active?: boolean;
  category?: Category;
  questions?: Question[];

  constructor() {
    this.qid = undefined;
    this.title = '';
    this.description = '';
    this.maxMarks = 0;
    this.numberOfQuestions = 0;
    this.active = false;
    this.category = undefined;
    this.questions = [];
  }
}
