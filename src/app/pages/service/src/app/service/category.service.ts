// src/app/service/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../../../category';
import { BASE_URL } from '../../../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${BASE_URL}/category`;

  constructor(private http: HttpClient) { }

  public categories(): Observable<Category[]> { // Correct method name
    return this.http.get<Category[]>(`${this.apiUrl}/`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/`, category);
  }

  public getCategory(cid: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${cid}`);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/`, category);
  }

  public deleteCategory(cid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cid}`);
  }
}
