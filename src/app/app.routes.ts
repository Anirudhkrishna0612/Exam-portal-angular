// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup'; // Your signup component
import { HomeComponent } from './components/home/home'; // <--- CORRECTED: Removed .component from the import path

export const routes: Routes = [
    // Default route for the root URL '/'
    {
        path: '',
        component: HomeComponent, // Home component for the default route
        pathMatch: 'full'
    },
    // Your signup route
    {
        path: 'signup',
        component: Signup,
    },
    // Wildcard route for any other undefined paths
    {
        path: '**',
        redirectTo: '' // Redirects to the home page
    }
];
