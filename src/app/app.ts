// src/app/app.ts (Assuming this is your root AppComponent)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For Common Angular directives
import { RouterOutlet } from '@angular/router'; // For routing
// **CRITICAL FIX: Import NavbarComponent, not Navbar**
import { NavbarComponent } from "./components/navbar/navbar"; // Correct path to navbar.ts, importing NavbarComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.html', // Assuming app.html
  styleUrls: ['./app.css'],   // Assuming app.css
  standalone: true, // Assuming AppComponent is also standalone
  imports: [
    CommonModule,
    RouterOutlet, // Ensure RouterOutlet is here if used in app.html
    // **CRITICAL FIX: Add NavbarComponent to imports array**
    NavbarComponent, // Add the correctly named NavbarComponent here
  ]
})
export class AppComponent {
  title = 'examfront'; // Example property
}
