// src/app/service/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JwtRequest } from '../models/jwt-request.model';
import { JwtResponse } from '../models/jwt-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8060';

  private currentUserSubject: BehaviorSubject<any | null>;
  // Public observables for template use (async pipe)
  public currentUser$: Observable<any | null>; // Observable for the user object
  public loggedInStatus$: Observable<boolean>; // Observable for login status

  constructor(private http: HttpClient) {
    console.log('AUTH_SERVICE_DEBUG: AuthService constructor called.');
    const storedUser = localStorage.getItem('user');
    console.log('AUTH_SERVICE_DEBUG: Stored user from localStorage on init:', storedUser);
    this.currentUserSubject = new BehaviorSubject<any | null>(storedUser ? JSON.parse(storedUser) : null);
    console.log('AUTH_SERVICE_DEBUG: currentUserSubject initial value:', this.currentUserSubject.value);

    // Assign the public observables here in the constructor
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.loggedInStatus$ = this.currentUserSubject.asObservable().pipe(
      map(user => user !== null),
      tap(status => console.log('AUTH_SERVICE_DEBUG: loggedInStatus$ emitted:', status))
    );

    this.currentUserSubject.subscribe(user => {
      console.log('AUTH_SERVICE_DEBUG: currentUserSubject value changed to:', user);
    });
  }

  generateToken(loginData: JwtRequest): Observable<JwtResponse> {
    console.log('AUTH_SERVICE_DEBUG: generateToken called for user:', loginData.username);
    return this.http.post<JwtResponse>(`${this.baseUrl}/generate-token`, loginData).pipe(
      tap(response => {
        console.log('AUTH_SERVICE_DEBUG: generateToken - API response received:', response);
        localStorage.setItem('user', JSON.stringify(response));
        console.log('AUTH_SERVICE_DEBUG: generateToken - User data SAVED to localStorage.');
        this.currentUserSubject.next(response);
        console.log('AUTH_SERVICE_DEBUG: generateToken - currentUserSubject.next(response) called. New value:', this.currentUserSubject.value);
      })
    );
  }

  // This method now serves as a synchronous getter for the current user object
  public getUser(): any | null {
    const userValue = this.currentUserSubject.value;
    console.log('AUTH_SERVICE_DEBUG: getUser() called. Returning:', userValue);
    return userValue;
  }

  public getToken(): string | null {
    const user = this.currentUserSubject.value;
    const token = user ? user.jwtToken : null;
    console.log('AUTH_SERVICE_DEBUG: getToken() called. Returning token:', token);
    return token;
  }

  // **CRITICAL FIX: isLoggedIn() returns a synchronous boolean for guards and immediate checks**
  public isLoggedIn(): boolean {
    const loggedInStatus = this.currentUserSubject.value !== null;
    console.log('AUTH_SERVICE_DEBUG: isLoggedIn() (synchronous) called. Returning:', loggedInStatus);
    return loggedInStatus;
  }

  logout(): void {
    console.log('AUTH_SERVICE_DEBUG: logout() called.');
    localStorage.removeItem('user');
    console.log('AUTH_SERVICE_DEBUG: User data removed from localStorage.');
    this.currentUserSubject.next(null);
    console.log('AUTH_SERVICE_DEBUG: currentUserSubject.next(null) called. New value:', this.currentUserSubject.value);
  }

  public getUserRoles(): string[] {
    const user = this.currentUserSubject.value;
    let roles: string[] = [];
    if (user && user.user && user.user.authorities) {
      roles = user.user.authorities.map((auth: any) => auth.authority);
    }
    console.log('AUTH_SERVICE_DEBUG: getUserRoles() called. Returning:', roles);
    return roles;
  }

  public hasRole(roleName: string): boolean {
    const roles = this.getUserRoles();
    const hasRoleStatus = roles.includes(roleName);
    console.log(`AUTH_SERVICE_DEBUG: hasRole(${roleName}) called. Returning:`, hasRoleStatus);
    return hasRoleStatus;
  }
}
