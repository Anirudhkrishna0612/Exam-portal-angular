// src/app/components/navbar/navbar.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd, Event, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from '../../pages/service/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Logic for navbar to react to route changes if needed.
    });

    // Subscribe to loginStatusSubject for reactive updates to navbar buttons (login/logout)
    this.loginService.loginStatusSubject.asObservable().subscribe(() => {
      // This triggers Angular's change detection for *ngIf conditions in the template.
    });
  }

  ngOnDestroy(): void {
    // If you add any subscriptions here later, remember to unsubscribe
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
