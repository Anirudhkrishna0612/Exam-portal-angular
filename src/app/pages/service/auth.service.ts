// src/app/service/auth.service.ts (Assuming this is its current location)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// **CRITICAL FIX: Corrected import paths based on auth.service.ts being in 'src/app/service/'**
import { JwtRequest } from '../models/jwt-request.model'; // Corrected path
import { JwtResponse } from '../models/jwt-response.model'; // Corrected path

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8060';

  constructor(private http: HttpClient) { }

  generateToken(loginData: JwtRequest): Observable<JwtResponse> {
    console.log('Sending login request:', loginData);
    return this.http.post<JwtResponse>(`${this.baseUrl}/generate-token`, loginData);
  }

  loginUser(token: string): void {
    localStorage.setItem('token', token);
    console.log('Token stored in local storage.');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('User logged out. Token removed from local storage.');
  }
}
