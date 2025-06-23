// src/app/models/category.ts

export class Category {
  cid?: number;
  title?: string;       // Can be undefined if not explicitly set
  description?: string; // Can be undefined if not explicitly set

  constructor() {
    this.cid = undefined;
    this.title = '';       // Default to empty string for safety
    this.description = ''; // Default to empty string for safety
  }
}
