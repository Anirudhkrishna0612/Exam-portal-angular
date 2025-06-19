// src/app/user.ts (This file defines your User data model interface)

// Defines the structure of a User object in your application.
// IMPORTANT: Ensure 'username' and 'password' are explicitly 'string' (not optional 'string?').
export interface User {
    id?: number;
    username: string; // **CRITICAL: Defined as 'string', not 'string?'**
    password: string; // **CRITICAL: Defined as 'string', not 'string?'**
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profile?: string; // Optional, as it might genuinely be null/undefined initially or if not provided
}
