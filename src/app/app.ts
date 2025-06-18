// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Keep RouterModule import for routerLink etc.
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from "./components/navbar/navbar"; // Assuming 'navbar' component exists and is standalone
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


// import { routes } from './app.routes'; // No longer directly imported here, but used in main.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // RouterModule.forRoot(routes), // <--- THIS LINE IS REMOVED
    MatButtonModule,
    Navbar,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    RouterModule, // Keep RouterModule if you use routerLink in app.html
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'examfront';
}