// src/app/app.routes.ts

import { Routes } from '@angular/router';

// **CRITICAL FIX: Use LoginComponent and SignupComponent for imports and component references**
// The files are login.ts and signup.ts, but the classes within them are typically named *Component.
import { LoginComponent } from './pages/login/login'; // Correct path to login.ts, importing LoginComponent class
import { Signup } from './pages/signup/signup'; // Correct path to signup.ts, importing SignupComponent class
// You may also have a Navbar and Home component
import { NavbarComponent } from './components/navbar/navbar'; // Assuming navbar.ts, importing NavbarComponent
import { Home } from './pages/home/home'; // Assuming home.ts, importing HomeComponent

export const routes: Routes = [
    {
        path: '',
        component: Home, // Assuming home page after login/signup
        // You might want to add children routes here for authenticated users
        // children: [
        //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        //   { path: 'dashboard', component: DashboardComponent },
        // ]
    },
    {
        path: 'login',
        component: LoginComponent // Use LoginComponent here
    },
    {
        path: 'signup',
        component: Signup // Use SignupComponent here
    },
    // Adding a route for navbar if it needs to be routed to (unlikely for a navbar component)
    // {
    //   path: 'navbar',
    //   component: NavbarComponent
    // }
];
