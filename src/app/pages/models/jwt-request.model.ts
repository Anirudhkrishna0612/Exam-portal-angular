// src/app/pages/models/jwt-request.model.ts

// This interface defines the structure of the data sent for JWT token generation.
export interface JwtRequest {
    // Declaring these as 'string' (not 'string?' or 'string | undefined')
    // tells TypeScript that these properties will always exist and be of type string.
    username: string; 
    password: string;
}
