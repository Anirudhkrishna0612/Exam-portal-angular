// src/app/service/category.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable
import { Category } from '../category';
import { BASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Method to load all categories from the backend
  public getCategories(): Observable<Category[]> {
    // Assuming your backend endpoint for categories is '/category/'
    return this.http.get<Category[]>(`${BASE_URL}/category/`);
  }

  // Method to add a new category
  public addCategory(category: Category): Observable<Category> {
    // Assuming your backend endpoint for adding categories is '/category/'
    return this.http.post<Category>(`${BASE_URL}/category/`, category);
  }

  // Method to delete a category
  public deleteCategory(cid: number): Observable<any> {
    // Assuming your backend endpoint for deleting categories is '/category/{cid}'
    return this.http.delete(`${BASE_URL}/category/${cid}`);
  }

  // Method to update a category
  public updateCategory(category: Category): Observable<Category> {
    // Assuming your backend endpoint for updating categories is '/category/'
    return this.http.put<Category>(`${BASE_URL}/category/`, category);
  }

  // Method to get a single category by ID
  public getCategory(cid: number): Observable<Category> {
    // Assuming your backend endpoint for getting a single category is '/category/{cid}'
    return this.http.get<Category>(`${BASE_URL}/category/${cid}`);
  }
}
