// src/app/models/category.ts

export class Category {
  cid?: number;
  title?: string;
  description?: string;

  constructor() {
    this.cid = undefined;
    this.title = '';
    this.description = '';
  }
}
