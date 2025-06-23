// src/app/service/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to hold the current authentication status.
  // It emits its current value whenever it's subscribed to, and when a new value is pushed.
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Observable stream for the loggedIn status. Components can subscribe to this.
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor() {
    // Initialize loggedIn status based on whether a token already exists in localStorage
    // This is important for maintaining login state across page refreshes.
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  /**
   * Updates the authentication status.
   * This method is called by LoginService on login/logout.
   * @param status True if logged in, false otherwise.
   */
  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  /**
   * Returns the current authentication status synchronously.
   * Useful for guards or immediate checks.
   * @returns True if logged in, false otherwise.
   */
  getLoggedInStatus(): boolean {
    return this.loggedIn.value;
  }
}
