// src/app/pages/service/login.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../../app.constants'; // Import the clean BASE_URL
import { User } from '../../user';
import { JwtRequest } from '../models/jwt-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  // CRITICAL FIX: apiUrl is now just the BASE_URL, prefixes will be added to specific endpoints
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  // Generate token (for login)
  public generateToken(loginData: JwtRequest): Observable<any> {
    // CRITICAL FIX: Explicitly add '/auth/generate-token' to the base URL
    return this.http.post(`${this.apiUrl}/auth/generate-token`, loginData);
  }

  // Set token and user data in localStorage
  public loginUser(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.loginStatusSubject.next(true);
    return true;
  }

  // Check if user is logged in
  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
  }

  // Logout user
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false);
    return true;
  }

  // Get token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Synchronous method to get user data from localStorage
  public getUser(): User | null {
    let userStr = localStorage.getItem('user');
    if (userStr != null && userStr !== 'undefined') {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        this.logout();
        return null;
      }
    } else {
      return null;
    }
  }

  // Provide getCurrentUser for profile.ts (synchronous)
  public getCurrentUser(): User | null {
    return this.getUser();
  }

  // Set user (to update the cached user data in localStorage if needed by other components)
  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserRole(): string | null {
    let user = this.getUser();
    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    }
    return null;
  }

  // Fetch user data from the backend after login
  public fetchUserFromServer(): Observable<User> {
    // CRITICAL FIX: Explicitly add '/auth/current-user' to the base URL
    return this.http.get<User>(`${this.apiUrl}/auth/current-user`);
  }
}
