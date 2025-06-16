import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from "./components/navbar/navbar";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    Navbar,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'examfront';
}
