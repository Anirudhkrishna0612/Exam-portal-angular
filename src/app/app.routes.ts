// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Home } from './pages/home/home';
import { NavbarComponent } from './components/navbar/navbar';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';

// **CRITICAL FIX: Correct path for AdminGuard based on your screenshot**
import { AdminGuard } from './pages/service/admin-guard'; // Path from src/app/ to src/app/pages/service/admin-guard.ts

// Assuming Dashboard component (for admin)
import { Dashboard } from './pages/admin/dashboard/dashboard';


export const routes: Routes = [
    {
        path: '',
        component: Home,
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
        component: Dashboard,
        canActivate: [AdminGuard], // Use the class name here
    },
    {
        path:'user-dashboard',
        component:UserDashboard,
    }
];
