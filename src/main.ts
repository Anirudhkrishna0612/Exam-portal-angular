// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// **CRITICAL FIX: Import AppComponent instead of App**
import { AppComponent } from './app/app'; // Correctly import the AppComponent class

bootstrapApplication(AppComponent, appConfig) // Use AppComponent here
  .catch((err) => console.error(err));
