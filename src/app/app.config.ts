// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import withInterceptorsFromDi and HTTP_INTERCEPTORS
import { AuthInterceptor } from './pages/auth.interceptor'; // **CRITICAL FIX: Import AuthInterceptor directly**

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    // **CRITICAL FIX: Use provideHttpClient with withInterceptorsFromDi()**
    // And then provide your interceptor via the HTTP_INTERCEPTORS token
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Crucial for multiple interceptors
    },
  ]
};
