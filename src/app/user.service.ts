// src/app/user.service.ts (NOTICE THE FILE NAME, IT'S NOT IN A 'services' SUBFOLDER)

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model'; // <-- CORRECTED PATH: Use './' as it's in the same directory
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService { // This class is correctly named UserService

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<any> {
    return this.http.post(`${baseUrl}/user/`, user);
  }
}
