// src/app/components/home/home.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for common directives
import { RouterModule } from '@angular/router'; // Needed for routerLink

@Component({
  selector: 'app-home',
  standalone: true, // Mark as standalone
  imports: [
    CommonModule,
    RouterModule // Import RouterModule to use routerLink in the template
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  // You can add properties or methods here for your home component
}