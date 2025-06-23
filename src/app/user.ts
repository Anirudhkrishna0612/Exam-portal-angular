// src/app/models/user.ts

export interface Authority {
  authority: string; // e.g., "ROLE_NORMAL", "ROLE_ADMIN"
}

export interface User {
  id?: number;
  username: string;
  password?: string; // Password might be optional if not sending it back
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  enabled?: boolean;
  profile?: string; // URL to profile picture or similar
  authorities?: Authority[]; // CRITICAL: This must exist and be an array of Authority objects
}
