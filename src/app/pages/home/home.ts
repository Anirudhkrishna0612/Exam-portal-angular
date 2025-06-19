// src/app/pages/home/home.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for standalone components

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true, // Mark this component as standalone
  imports: [
    CommonModule,
    // Add any Material modules if your home.html uses them
  ]
})
export class Home implements OnInit { // **CRITICAL: The class name is 'Home' as per your instruction**

  constructor() { }

  ngOnInit(): void {
  }

  // Any home page specific logic
}
