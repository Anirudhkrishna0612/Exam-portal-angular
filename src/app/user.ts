// src/app/user.ts

export class User {
  id?: number | null;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  enabled?: boolean;
  profile?: string;
  authorities?: { authority: string }[]; // Keeping authorities for getUserRole() consistency
}
