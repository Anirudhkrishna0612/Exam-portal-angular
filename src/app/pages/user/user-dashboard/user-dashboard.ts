// src/app/pages/user/user-dashboard/user-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

// FIX: Corrected path for UserSidebarComponent (assuming it's in src/app/components/user-sidebar)
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    UserSidebarComponent,
    RouterOutlet,
    MatSidenavModule
  ],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
