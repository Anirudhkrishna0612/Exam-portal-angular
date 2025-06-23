// src/app/models/question.ts
import { Quiz } from './quiz';

export class Question {
  quesId?: number;
  content?: string;
  image?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer?: string;
  quiz?: Quiz;
  givenAnswer?: string;

  constructor() {
    this.quesId = undefined;
    this.content = '';
    this.image = '';
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.answer = '';
    this.quiz = undefined;
    this.givenAnswer = '';
  }
}
