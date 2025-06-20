// src/app/components/navbar/navbar.ts

import { Component, OnInit } from '@angular/core';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { Router, RouterLink, RouterModule } from '@angular/router';


import { LoginService } from '../../login.service';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
  ]
})
export class NavbarComponent implements OnInit {

  
  constructor(public login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    this.login.logout(); 
    this.router.navigate(['/login']); 
  }

  
  public getDashboardLink(): string {
    const userRole = this.login.getUserRole(); 
    if (userRole === "ADMIN") {
      return '/admin'; 
    } else if (userRole === "NORMAL") {
      return '/user-dashboard'; 
    }
    
    return '/'; 
  }

}
