// src/app/user.ts (This file defines your User data model interface)

export interface User {
    id?: number;
    username: string;
    password: string; // **CRITICAL FIX: Made password a mandatory 'string' for forms**
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profile?: string;
    enabled?: boolean;

    // **CRITICAL FIX: Ensure 'authorities' property is correctly defined**
    // This now matches the "authorities": [ { "authority": "ROLE_ADMIN" } ] structure
    // from your backend's JSON response (once backend is fixed for 'null').
    authorities?: { authority: string | null }[];
    
    // Properties from Spring Security's UserDetails for convenience if needed on frontend
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;
}
