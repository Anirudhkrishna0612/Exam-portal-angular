// src/app/login.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './user'; // Updated User model
import { JwtRequest } from './pages/models/jwt-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8060';
  private TOKEN_KEY = 'jwtToken';
  private USER_KEY = 'currentUser';

  private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.getStoredUser());
  public loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    const storedUser = this.getStoredUser();
    if (storedToken && storedUser) {
      console.log("LoginService: Found stored token and user on init.");
      this.loggedInUserSubject.next(storedUser);
    } else {
      console.log("LoginService: No stored token or user found on init.");
    }
  }

  public generateToken(loginData: JwtRequest): Observable<any> {
    console.log("LoginService: Sending login request to backend...");
    return this.http.post(`${this.baseUrl}/generate-token`, loginData);
  }

  public setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log("LoginService: Token saved to localStorage.");
  }

  public getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log("LoginService: Retrieving token from localStorage. Value:", token ? "present" : "null/undefined");
    return token;
  }

  public setUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.loggedInUserSubject.next(user);
    console.log("LoginService: User object saved to localStorage and BehaviorSubject updated.");
  }

  public getStoredUser(): User | null {
    const userString = localStorage.getItem(this.USER_KEY);
    if (userString) {
      try {
        return JSON.parse(userString) as User;
      } catch (e) {
        console.error("LoginService: Error parsing stored user from localStorage", e);
        return null;
      }
    }
    return null;
  }

  // **CRITICAL FIX: Update getUserRole() to correctly use 'authorities'**
  public getUserRole(): string | null {
    const user = this.getStoredUser();
    // Check if user and authorities array exist and are not empty
    if (user && user.authorities && user.authorities.length > 0) {
      // Get the first authority object
      const firstAuthority = user.authorities[0];
      // Check if the 'authority' property exists and is a string
      if (firstAuthority && typeof firstAuthority.authority === 'string') {
        // Remove "ROLE_" prefix if it exists
        return firstAuthority.authority.replace('ROLE_', '');
      }
    }
    return null; // Return null if no user, no authorities, or authority string is missing/null
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.loggedInUserSubject.next(null);
    console.log("LoginService: User logged out, token and user removed from localStorage.");
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/current-user`);
  }
}
