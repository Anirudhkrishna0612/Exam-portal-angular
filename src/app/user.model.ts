// src/app/models/user.model.ts (This file should define the User data model interface)

// Defines the structure of a User object in your application.
// This interface MUST include all properties that you expect a user object to have,
// especially those you use in forms (like username, password, firstName, etc.).
// It should ideally align with your backend's User entity.
export interface User {
    id?: number; // Optional: if your backend assigns an ID, it might be here
    username: string;
    password?: string; // Optional: password might not be returned by backend after creation, but needed for signup form
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profile?: string; // Optional field for profile picture/path, based on your backend User entity

    // Add any other properties your backend User entity has, such as:
    // enabled?: boolean;
    // userRoles?: any[]; // Or a more specific interface/type for roles
}
