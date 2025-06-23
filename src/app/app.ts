// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For Common Angular directives
import { RouterOutlet } from '@angular/router'; // For routing

// **CRITICAL FIX: Import NavbarComponent correctly**
import { NavbarComponent } from "./components/navbar/navbar"; // Path to navbar.ts, importing NavbarComponent

// Angular Material Modules (ensure these are installed via ng add @angular/material)
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.html', // Points to app.html
  styleUrls: ['./app.css'],  // Points to app.css
  standalone: true, // Marks AppComponent as standalone
  imports: [
    CommonModule,
    RouterOutlet, // Required for <router-outlet> in app.html
    NavbarComponent, // **CRITICAL FIX: Add NavbarComponent to imports array**
    MatSidenavModule, // Added if you plan to use sidenav from Material
    MatListModule,    // Added if you plan to use lists from Material
    MatCardModule,    // Added if you plan to use cards from Material
  ]
})
export class AppComponent {
  title = 'examfront'; // Example property for your app
}
