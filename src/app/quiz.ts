// src/app/models/quiz.ts

import { Category } from "./category"; // Assuming Category model exists and path is correct
import { Question } from "./question"; // Correct path to Question model

export class Quiz {
    qid?: number;
    title: string = '';
    description: string = '';
    maxMarks?: number;
    numberOfQuestions?: number;
    active: boolean = false;
    category?: Category;
    // The questions property is typically not fully populated on the frontend
    // especially to avoid circular references in client-side models,
    // and when receiving a Quiz from the backend, it's often ignored if @JsonIgnore is on backend.
    questions?: Question[]; // This will likely be empty or null when fetched
}
