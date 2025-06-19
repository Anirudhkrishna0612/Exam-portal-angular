// src/app/user.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

// Import your User model interface
import { User } from './user'; // Confirmed path: src/app/user.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // **CRITICAL FIX: Specify the expected return type as Observable<User>**
  // This tells TypeScript that the HttpClient.post call will return an Observable
  // emitting a 'User' object, which resolves the type mismatch in the subscribe block.
  public addUser(user: User){
    console.log("UserService: Sending add user request for user:", user.username);
    return this.http.post<User>(`${baseUrl}/user/`, user); // <--- Add <User> here
  }
}
