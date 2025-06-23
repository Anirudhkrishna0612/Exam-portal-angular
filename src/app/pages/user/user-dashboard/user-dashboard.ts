// src/app/pages/user/user-dashboard/user-dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';


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
    // Removed ɵEmptyOutletComponent as it's an internal symbol and should not be directly imported
  ],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
