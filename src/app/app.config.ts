// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';

// **CRITICAL FIX: Corrected import path for auth.interceptor.ts**
// It is now relative to app.config.ts, pointing into the 'pages' directory.
import { AuthInterceptorProviders } from './pages/auth.interceptor'; // <--- THIS IS THE CHANGED LINE

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()), // Enable DI-based interceptors
    AuthInterceptorProviders, // Provide your custom interceptor here
    // importProvidersFrom(MatSnackBarModule), // Only if needed at root level as a provider
  ]
};
