// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup'; // Your signup component
import { Home } from './pages/home/home'; // <--- CORRECTED: Removed .component from the import path
import { Login } from './pages/login/login';

export const routes: Routes = [
    // Default route for the root URL '/'
    {
        path: '',
        component: Home, // Home component for the default route
        pathMatch: 'full'
    },
    // Your signup route
    {
        path: 'signup',
        component: Signup,
    },
    {
        path: 'login',
        component: Login,
    },
    // Wildcard route for any other undefined paths
    {
        path: '**',
        redirectTo: '' // Redirects to the home page
    }
];
