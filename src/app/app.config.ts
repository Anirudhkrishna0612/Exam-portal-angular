// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'; // For HTTP client and interceptors

import { routes } from './app.routes'; // Import your defined routes

// Angular Material Providers
// Make sure all Mat modules used in ANY standalone component are imported here OR in each component's imports
import { provideAnimations } from '@angular/platform-browser/animations'; // Required for Angular Material animations
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // If used in some future component

// Interceptor for JWT authentication
import { AuthInterceptor } from './pages/auth.interceptor'; // Will be created next

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provides the Angular router based on your routes
    provideHttpClient(withInterceptorsFromDi()), // Provides HttpClient and enables DI for interceptors
    provideAnimations(), // Provides browser animations for Material components

    // Provide your custom HTTP interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Your custom interceptor class
      multi: true // Essential for providing multiple interceptors
    },

    // Angular Material Modules (usually imported directly in standalone components,
    // but listing them here ensures animations/themings are correctly applied globally,
    // and can act as a central place if you decide to provide them globally later).
    // For standalone, they typically go into component 'imports' array.
    // However, some core providers for Material components might need to be here.
    // For simplicity, we list them for reference, but their actual 'import' is in components.
    // No direct `import` statements for Mat modules in `providers` array.
    // This part is more conceptual, actual imports are in component `imports: [...]`.
    // The `provideAnimations()` is the key global Material setup here.
  ]
};
