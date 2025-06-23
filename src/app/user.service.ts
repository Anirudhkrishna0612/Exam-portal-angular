// src/app/service/user.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// **CRITICAL FIX: Import User from the 'models' folder**
import { User } from './user'; // Assuming User model is at src/app/models/user.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Base URL for your backend API
  private baseUrl = 'http://localhost:8080'; // Adjust if your backend is on a different port

  constructor(private http: HttpClient) { }

  /**
   * Adds a new user (registers them) to the backend.
   * @param user The User object to add.
   * @returns An Observable of the added User object.
   */
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/`, user);
  }

  /**
   * Gets a user by username (for profile, etc.).
   * @param username The username of the user to fetch.
   * @returns An Observable of the User object.
   */
  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${username}`);
  }

  /**
   * Updates an existing user on the backend.
   * @param user The User object with updated data.
   * @returns An Observable of the updated User object.
   */
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/`, user);
  }

  // You might add more methods here like deleteUser, getAllUsers (for admin), etc.
}
