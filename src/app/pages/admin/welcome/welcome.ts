// src/app/pages/admin/welcome/welcome.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For NgIf, NgFor
import { MatCardModule } from '@angular/material/card'; // For MatCard

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule // Include MatCardModule
  ],
  templateUrl: './welcome.html', // Points to welcome.html
  styleUrls: ['./welcome.css']   // Points to welcome.css
})
export class Welcome implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
