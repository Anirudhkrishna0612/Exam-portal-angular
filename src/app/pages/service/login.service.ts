// src/app/pages/service/login.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../../app.constants'; // Keeping this import path as per your file
// FIX: Corrected import paths for User and JwtRequest models
import { User } from '../../user'; // Assuming User model is in src/app/models/user.ts
import { JwtRequest } from '../models/jwt-request.model'; // Assuming JwtRequest is in src/app/models/jwt-request.model.ts
import { AuthService } from './auth.service'; // FIX: Import AuthService (assuming it's in src/app/service/auth.service.ts)

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  private apiUrl = BASE_URL;

  // FIX: Inject AuthService
  constructor(private http: HttpClient, private authService: AuthService) { }

  public generateToken(loginData: JwtRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/generate-token`, loginData);
  }

  public loginUser(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.loginStatusSubject.next(true); // Update the BehaviorSubject in this service
    this.authService.setLoggedIn(true); // FIX: Inform AuthService that user is logged in
    return true;
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    // FIX: Simplified and robust isLoggedIn check
    return tokenStr !== null && tokenStr.trim() !== '';
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false);
    this.authService.setLoggedIn(false); // FIX: Inform AuthService that user is logged out
    return true;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

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

  public getCurrentUser(): User | null {
    return this.getUser();
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserRole(): string | null {
    let user = this.getUser();
    if (user && user.authorities && user.authorities.length > 0) {
      // Assuming authorities is an array of objects, and each object has an 'authority' string property
      // Example: [{ authority: "ROLE_ADMIN" }, { authority: "ROLE_USER" }]
      return user.authorities[0].authority; // Returns the first authority string
    }
    return null;
  }

  public fetchUserFromServer(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/current-user`);
  }
}
