// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Home } from './pages/home/home';
// import { NavbarComponent } from './components/navbar/navbar'; // Not typically imported directly in routes
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';

import { RoleGuard } from './pages/service/admin-guard'; 

import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Welcome } from './pages/admin/welcome/welcome';
import { ProfileComponent } from './pages/profile/profile';


export const routes: Routes = [
    {
        path: '',
        component: Home, // Assuming '/' leads to Home or a landing page
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'admin',
        component: Dashboard, // Parent component for all admin-related views
        canActivate: [RoleGuard],
        data: { requiredRole: 'ADMIN' },
        children: [
            {
                path: '', // Default child route for /admin (e.g., /admin redirects to /admin/welcome)
                component: Welcome
            },
            {
                path: 'profile', // Route for /admin/profile
                component: ProfileComponent
            },
            // **CRITICAL FIX: Add the missing routes for Categories, Add Category, Quizzes**
            
        ] 
    },
    {
        path: 'user-dashboard',
        component: UserDashboard,
        canActivate: [RoleGuard],
        data: { requiredRole: 'NORMAL' }
    },
    // Optional: A catch-all route for any undefined paths, redirecting to home or login
    {
        path: '**',
        redirectTo: '/login', // Or '/' for home
        pathMatch: 'full'
    }
];
