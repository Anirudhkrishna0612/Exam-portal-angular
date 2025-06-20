// src/app/components/navbar/navbar.ts

import { Component, OnInit } from '@angular/core';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// RouterLink and/or RouterModule for routerLink directive
import { RouterLink, RouterModule } from '@angular/router';

// **CRITICAL FIX: Import LoginService**
import { LoginService } from '../../login.service'; // Path from src/app/components/navbar/ to src/app/login.service.ts

// CommonModule is generally good practice for standalone components if using *ngIf, *ngFor etc.
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [
    CommonModule, // Required for *ngIf
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
  ]
})
export class NavbarComponent implements OnInit {

  // **CRITICAL FIX: Inject LoginService and make it public so template can access it**
  constructor(public login: LoginService) { } // 'public' keyword makes it accessible in template

  ngOnInit(): void {
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
