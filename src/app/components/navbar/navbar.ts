import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Keep RouterModule import for routerLink etc.
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [
     RouterOutlet,
    // RouterModule.forRoot(routes), // <--- THIS LINE IS REMOVED
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    RouterModule, // Keep RouterModule if you use routerLink in app.html
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}
