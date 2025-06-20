// src/app/user.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable
import baseUrl from './helper'; // Assuming baseUrl is a string constant

// Import your User model interface
import { User } from './user'; // Confirmed path: src/app/user.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Method to create a new user (signup)
  public addUser(user: User): Observable<User> { // Explicitly define return type for clarity
    console.log("UserService: Sending add user request for user:", user.username);
    return this.http.post<User>(`${baseUrl}/user/`, user);
  }

  // **CRITICAL FIX: Add the getUserByUsername method**
  public getUserByUsername(username: string): Observable<User> {
    console.log(`UserService: Fetching user by username: ${username}`);
    return this.http.get<User>(`${baseUrl}/user/${username}`); // Adjust endpoint if different
  }

  // You might also want to add other common user service methods like:
  // public deleteUser(userId: number): Observable<void> {
  //   return this.http.delete<void>(`${baseUrl}/user/${userId}`);
  // }

  // public getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${baseUrl}/user/`);
  // }
}
