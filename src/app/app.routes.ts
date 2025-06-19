// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Home } from './pages/home/home';
import { NavbarComponent } from './components/navbar/navbar';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';

// **CRITICAL FIX: Import RoleGuard (from the file that was previously admin-guard.ts)**
import { RoleGuard } from './pages/service/admin-guard'; // Import the renamed RoleGuard class

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
        canActivate: [RoleGuard], // Use the generic RoleGuard
        data: { requiredRole: 'ADMIN' } // **CRITICAL: Pass the required role for this route**
    },
    {
        path:'user-dashboard',
        component:UserDashboard,
        canActivate: [RoleGuard], // Use the generic RoleGuard
        data: { requiredRole: 'NORMAL' } // **CRITICAL: Pass the required role for this route**
    }
];
