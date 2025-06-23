// src/app/service/user.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user'; // FIX: Corrected User model path to standard location
import { BASE_URL } from './app.constants'; // Assuming BASE_URL is in helper.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = BASE_URL; // Use BASE_URL from helper

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/`, user);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${username}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/`, user);
  }
}
