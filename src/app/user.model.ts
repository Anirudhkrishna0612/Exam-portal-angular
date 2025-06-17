// src/app/models/user.model.ts

// Defines the structure of a User object
export interface User {
  id?: number; // Optional: if your backend assigns an ID, it might be here
  username: string;
  password?: string; // Optional: password might not be returned by backend after creation
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Add any other properties your User entity has in the backend
}
